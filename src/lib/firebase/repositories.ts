import {
  Firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentSnapshot,
  WithFieldValue,
  FirestoreDataConverter,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import app from "./config";
import { getFirestore } from "firebase/firestore";
import Logger from "@/lib/pino/logger";
import { JournalEntry, EncryptedJournalEntry } from "@/types/entry.type";

// Create a converter for type safety
const createConverter = <
  T extends { id?: string }
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data;
    return rest;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): T => {
    const data = snapshot.data();
    return { id: snapshot.id, ...data } as T;
  },
});

export class FirebaseRepository<T extends { id?: string }> {
  protected db: Firestore;
  protected collectionPath: string;
  protected converter: FirestoreDataConverter<T>;

  constructor(collectionPath: string) {
    this.db = getFirestore(app);
    this.collectionPath = collectionPath;
    this.converter = createConverter<T>();
  }

  private handleError(error: unknown, context: string): never {
    if (error instanceof FirebaseError) {
      Logger.error(`Firebase error in ${context}`, {
        code: error.code,
        message: error.message,
      });
      throw new Error(`Database operation failed: ${error.message}`);
    }

    const message =
      error instanceof Error ? error.message : "Unknown database error";
    Logger.error(`Unexpected error in ${context}`, { error: message });
    throw new Error(`Database operation failed: ${message}`);
  }

  protected getCollectionRef(userId: string) {
    return collection(
      this.db,
      "journals",
      userId,
      this.collectionPath
    ).withConverter(this.converter);
  }

  protected getDocRef(userId: string, id: string) {
    return doc(
      this.db,
      "journals",
      userId,
      this.collectionPath,
      id
    ).withConverter(this.converter);
  }

  async save(userId: string, entity: Partial<T>): Promise<T> {
    try {
      const entityRef = entity.id
        ? this.getDocRef(userId, entity.id)
        : doc(this.getCollectionRef(userId));

      const data = { ...entity };
      delete data.id;

      await setDoc(entityRef, data as WithFieldValue<T>);
      Logger.info(`Document saved`, {
        userId,
        collection: this.collectionPath,
        id: entityRef.id,
      });

      return { id: entityRef.id, ...data } as T;
    } catch (error) {
      this.handleError(error, "save operation");
    }
  }

  async saveAll(userId: string, entities: Partial<T>[]): Promise<void> {
    try {
      const batch = writeBatch(this.db);
      const collectionRef = this.getCollectionRef(userId);

      entities.forEach((entity) => {
        const entityRef = entity.id
          ? this.getDocRef(userId, entity.id)
          : doc(collectionRef);

        const data = { ...entity };
        delete data.id;

        batch.set(entityRef, data as WithFieldValue<T>);
      });

      await batch.commit();
      Logger.info(`Batch saved ${entities.length} documents`, {
        userId,
        collection: this.collectionPath,
      });
    } catch (error) {
      this.handleError(error, "batch save operation");
    }
  }

  async findById(userId: string, id: string): Promise<T | null> {
    try {
      const docRef = this.getDocRef(userId, id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        Logger.debug(`Document not found`, {
          userId,
          collection: this.collectionPath,
          id,
        });
        return null;
      }

      return snapshot.data();
    } catch (error) {
      this.handleError(error, "findById operation");
    }
  }

  async findAll(userId: string): Promise<T[]> {
    try {
      const collectionRef = this.getCollectionRef(userId);
      const snapshot = await getDocs(collectionRef);

      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      this.handleError(error, "findAll operation");
    }
  }

  async update(
    userId: string,
    id: string,
    updateData: Partial<T>
  ): Promise<void> {
    try {
      const docRef = this.getDocRef(userId, id);
      await updateDoc(docRef, updateData as WithFieldValue<T>);
      Logger.debug(`Document updated`, {
        userId,
        collection: this.collectionPath,
        id,
      });
    } catch (error) {
      this.handleError(error, "update operation");
    }
  }

  async delete(userId: string, id: string): Promise<void> {
    try {
      const docRef = this.getDocRef(userId, id);
      await deleteDoc(docRef);
      Logger.info(`Document deleted`, {
        userId,
        collection: this.collectionPath,
        id,
      });
    } catch (error) {
      this.handleError(error, "delete operation");
    }
  }

  async deleteAll(userId: string): Promise<boolean> {
    try {
      const collectionRef = this.getCollectionRef(userId);
      const snapshot = await getDocs(collectionRef);
      const batch = writeBatch(this.db);

      if (snapshot.empty) {
        Logger.debug(`No documents to delete`, {
          userId,
          collection: this.collectionPath,
        });
        return false;
      }

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      Logger.info(`Deleted ${snapshot.size} documents`, {
        userId,
        collection: this.collectionPath,
      });
      return true;
    } catch (error) {
      this.handleError(error, "deleteAll operation");
    }
  }
}

// JournalEntry-specific repository
export class JournalEntryRepository extends FirebaseRepository<JournalEntry> {
  constructor() {
    super("entries");
  }

  // Custom validation for journal entries
  protected documentToModel(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): JournalEntry {
    const data = snapshot.data();

    if (!data) {
      throw new Error(`Document ${snapshot.id} has no data`);
    }

    const isValidEntry = (
      data: DocumentData
    ): data is Omit<JournalEntry, "id"> => {
      return (
        typeof data.answer === "string" &&
        typeof data.date === "string" &&
        typeof data.createdAt === "string" &&
        typeof data.question === "string" &&
        (data.category === undefined || typeof data.category === "string") &&
        (data.isEncrypted === undefined ||
          typeof data.isEncrypted === "boolean")
      );
    };

    if (!isValidEntry(data)) {
      Logger.warn("Invalid journal entry structure", { id: snapshot.id, data });
      throw new Error(
        `Invalid journal entry structure for document ${snapshot.id}`
      );
    }

    return {
      id: snapshot.id,
      ...data,
    };
  }

  // Custom method for encrypted updates
  async updateEncryptedEntry(
    userId: string,
    id: string,
    updateData: Pick<
      EncryptedJournalEntry,
      "answer" | "isEncrypted" | "updatedAt"
    >
  ): Promise<void> {
    await this.update(userId, id, updateData);
  }
}

export const journalEntryRepository = new JournalEntryRepository();
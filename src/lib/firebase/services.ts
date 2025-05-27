
import { JournalEntry, EncryptedJournalEntry } from "@/types/entry.type";
import app from "./config";
import { doc, getFirestore, collection, getDocs, deleteDoc, updateDoc, getDoc, writeBatch, DocumentData } from "firebase/firestore";

export const db = getFirestore(app);
  
export async function saveJournalEntries(
  userId: string,
  entries: Omit<JournalEntry, "id">[]
) {
  const entriesRef = collection(db, "journals", userId, "entries");
  const batch = writeBatch(db);

  entries.forEach((entry) => {
    const docRef = doc(entriesRef);
    batch.set(docRef, entry);
  });

  await batch.commit();
}

export async function getJournalEntries(userId: string) {
  const entriesRef = collection(db, "journals", userId, "entries");
  const snapshot = await getDocs(entriesRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (JournalEntry & { id: string })[];
}

export async function deleteJournalEntry(userId: string, id: string) {
  const docRef = doc(db, "journals", userId, "entries", id);
  await deleteDoc(docRef);
}


export async function updateJournalEntry(
  userId: string,
  id: string,
  updateData: Pick<EncryptedJournalEntry, "answer" | "isEncrypted" | "updatedAt">
): Promise<void> {
  const docRef = doc(db, "journals", userId, "entries", id);
  await updateDoc(docRef, updateData);
}

export async function getJournalEntry(
  userId: string,
  id: string
): Promise<JournalEntry | null> {
  const docRef = doc(db, "journals", userId, "entries", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const rawData = snapshot.data();

  const isValidEntry = (
    data: DocumentData
  ): data is Omit<JournalEntry, "id"> => {
    return (
      typeof data.answer === "string" &&
      typeof data.date === "string" &&
      typeof data.createdAt === "string" &&
      typeof data.question === "string" &&
      (data.category === undefined || typeof data.category === "string") &&
      (data.isEncrypted === undefined || typeof data.isEncrypted === "boolean")
    );
  };

  if (!isValidEntry(rawData)) {
    console.warn("Invalid journal entry structure:", rawData);
    return null;
  }

  return {
    id: snapshot.id,
    ...rawData,
  };
}
export async function deleteUserData(userId: string): Promise<boolean> {
  try {
    if (!userId) throw new Error("User ID is required");

    const batch = writeBatch(db);
    const entriesRef = collection(db, "journals", userId, "entries");
    const userDocRef = doc(db, "journals", userId);

    // Delete all entries
    const entriesSnapshot = await getDocs(entriesRef);
    let hasOperations = false;

    if (!entriesSnapshot.empty) {
      entriesSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
        hasOperations = true;
      });
    } else {
      console.log("No journal entries found to delete");
    }

    // Check if user document exists before deleting
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      batch.delete(userDocRef);
      hasOperations = true;
    } else {
      console.log("User document not found");
    }

    // Only commit if there are operations to perform
    if (hasOperations) {
      await batch.commit();
      console.log("Successfully deleted user data");
      return true;
    }

    return false;
  } catch (error: unknown) {
    console.error("Error deleting user data:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete user data: ${error.message}`);
    }
    throw new Error("Failed to delete user data due to unknown error");
  }
}
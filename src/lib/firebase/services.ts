
import { JournalEntry } from "@/types/entry.type";
import app from "./config";
import { doc, getFirestore, collection, getDocs, deleteDoc, updateDoc, getDoc, addDoc, writeBatch } from "firebase/firestore";

export const db = getFirestore(app);
  
export async function saveJournalEntries(
  userId: string,
  entries: { answer: string; question: string }[]
) {
  const entriesRef = collection(db, "journals", userId, "entries");

  const today = new Date();
  const clientTimezoneOffset = today.getTimezoneOffset() * 60000;
  const localDate = new Date(today.getTime() - clientTimezoneOffset);
  const dateString = localDate.toISOString().split("T")[0];

  const promises = entries.map(({ answer, question }) =>
    addDoc(entriesRef, {
      answer,
      question,
      createdAt: today.toISOString(), 
      date: dateString,
    })
  );

  await Promise.all(promises);
}

export async function getJournalEntries(userId: string) {
  const entriesRef = collection(db, "journals", userId, "entries");
  const snapshot = await getDocs(entriesRef);

  const entries: (JournalEntry & { id: string })[] = snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...(doc.data() as JournalEntry), 
    })
  );

  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

export async function deleteJournalEntry(userId: string, id: string) {
  const docRef = doc(db, "journals", userId, "entries", id);
  await deleteDoc(docRef);
}

export async function updateJournalEntry(
  userId: string,
  id: string,
  newAnswer: string
) {
  const docRef = doc(db, "journals", userId, "entries", id);
  await updateDoc(docRef, {
    answer: newAnswer,
  });
}

export async function getJournalEntry(userId: string, id: string) {
  const docRef = doc(db, "journals", userId, "entries", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const rawData = snapshot.data();

  // Validasi properti penting
  if (
    typeof rawData.answer !== "string" ||
    typeof rawData.date !== "string" ||
    typeof rawData.createdAt !== "string" ||
    typeof rawData.question !== "string"
  ) {
    console.warn("Invalid journal entry structure:", rawData);
    return null;
  }

  const data = rawData as JournalEntry;

  return {
    id: snapshot.id,
    ...data,
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
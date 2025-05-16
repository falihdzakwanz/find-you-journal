
import app from "./config";
import { doc, setDoc, getFirestore, collection, getDocs, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

export const db = getFirestore(app);

type JournalEntry = {
  content: string;
  createdAt: string;
  date: string;
};
  
export async function saveJournalEntry(
  userId: string,
  content: string,
  question: string
) {
  const today = new Date().toISOString().slice(0, 10);
  const docRef = doc(db, "journals", userId, "entries", today);

  await setDoc(docRef, {
    content,
    question,
    createdAt: new Date().toISOString(),
    date: today,
  });
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

export async function deleteJournalEntry(userId: string, date: string) {
  const docRef = doc(db, "journals", userId, "entries", date);
  await deleteDoc(docRef);
}

export async function updateJournalEntry(
  userId: string,
  date: string,
  newContent: string
) {
  const docRef = doc(db, "journals", userId, "entries", date);
  await updateDoc(docRef, {
    content: newContent,
  });
}

export async function getJournalEntry(userId: string, date: string) {
  const docRef = doc(db, "journals", userId, "entries", date);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const rawData = snapshot.data();

  // Validasi properti penting
  if (
    typeof rawData.content !== "string" ||
    typeof rawData.date !== "string" ||
    typeof rawData.createdAt !== "string"
  ) {
    console.warn("Invalid journal entry structure:", rawData);
    return null; // atau lempar error jika kamu ingin logika lebih ketat
  }

  const data = rawData as JournalEntry;

  return {
    id: snapshot.id,
    ...data,
  };
}


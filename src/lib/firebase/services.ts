
import app from "./config";
import { doc, setDoc, getFirestore, collection, getDocs, deleteDoc } from "firebase/firestore";

export const db = getFirestore(app);

type JournalEntry = {
  content: string;
  createdAt: string;
  date: string;
};
  

export async function saveJournalEntry(userId: string, content: string) {
  const today = new Date().toISOString().slice(0, 10);
  const docRef = doc(db, "journals", userId, "entries", today);

  await setDoc(docRef, {
    content,
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

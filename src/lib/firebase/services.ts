
import app from "./config";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export const db = getFirestore(app);

export async function saveJournalEntry(userId: string, content: string) {
  const today = new Date().toISOString().slice(0, 10);
  const docRef = doc(db, "journals", userId, "entries", today);

  await setDoc(docRef, {
    content,
    createdAt: new Date().toISOString(),
    date: today,
  });
}

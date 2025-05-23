import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getJournalEntry } from "@/lib/firebase/services";
import { redirect } from "next/navigation";
import EditJournalForm from "@/components/EditJournalForm";
import formatDateIndo from "@/utils/formatDate";

interface Params {
  date: string;
  id: string;
}
export default async function EditJournalPage({ params }: { params: Params }) {
  const { date, id } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const entry = await getJournalEntry(session.user.email, id);
  if (!entry) redirect("/journal/history"); // jika tidak ada entri

  return (
    <main className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-2">{entry.question}</h1>
      <h2 className="text-lg mb-4">{formatDateIndo(date)}</h2>
      <EditJournalForm initialAnswer={entry.answer} id={id} />
    </main>
  );
}

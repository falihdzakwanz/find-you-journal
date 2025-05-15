// app/journal/edit/[date]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getJournalEntry } from "@/lib/firebase/services";
import { redirect } from "next/navigation";
import EditJournalForm from "@/components/EditJournalForm";

interface Props {
  params: { date: string };
}

export default async function EditJournalPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const entry = await getJournalEntry(session.user.email, params.date);
  if (!entry) redirect("/journal/history"); // jika tidak ada entri

  return (
    <main className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Edit Jurnal - {params.date}</h1>
      <EditJournalForm initialContent={entry.content} date={params.date} />
    </main>
  );
}

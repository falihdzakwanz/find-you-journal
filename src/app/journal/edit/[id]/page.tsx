import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { journalEntryRepository } from "@/lib/firebase/repositories";
import { redirect } from "next/navigation";
import EditJournalForm from "@/components/journal/EditJournalForm";
import { formatDateEng } from "@/utils/formatDate";
import { decrypt } from "@/lib/webCrypto/encryption";

interface Params {
  id: string;
}

export default async function EditJournalPage({ params }: { params: Params }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  try {
    const entry = await journalEntryRepository.findById(session.user.email, id);
    if (!entry) {
      redirect("/journal/history");
    }

    const decryptedEntry = {
      ...entry,
      answer: await decrypt(entry.answer),
    };

    return (
      <main className="max-w-3xl px-4 py-10 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-dark-brown md:text-3xl lg:text-4xl">
            {entry.question}
          </h1>
          <p className="mt-2 text-primary/80 md:text-lg">
            {formatDateEng(decryptedEntry.date)}
          </p>
        </div>
        <EditJournalForm initialAnswer={decryptedEntry.answer} id={id} />
      </main>
    );
  } catch (error) {
    console.error("Failed to load journal entry:", error);
    redirect("/journal/history");
  }
}

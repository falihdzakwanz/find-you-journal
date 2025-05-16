import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { saveJournalEntries } from "@/lib/firebase/services";

type JournalEntryInput = {
  answer: string;
  question: string;
};


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const entries: JournalEntryInput[] = body.entries;

  if (!Array.isArray(entries) || entries.length === 0) {
    return NextResponse.json(
      { error: "Entries must be a non-empty array" },
      { status: 400 }
    );
  }

  const validEntries = entries.filter(
    (e): e is JournalEntryInput =>
      typeof e.answer === "string" &&
      typeof e.question === "string" &&
      e.answer.trim() !== "" &&
      e.question.trim() !== ""
  );

  if (validEntries.length === 0) {
    return NextResponse.json(
      { error: "No valid entries provided" },
      { status: 400 }
    );
  }

  try {
    await saveJournalEntries(session.user.email, validEntries);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save journal entries", err);
    return NextResponse.json(
      { error: "Failed to save journal entries" },
      { status: 500 }
    );
  }
}

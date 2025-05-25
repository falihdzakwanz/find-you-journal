import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { saveJournalEntries } from "@/lib/firebase/services";
import { encrypt } from "@/lib/webCrypto/encryption";
import type {
  JournalEntryInput,
  EncryptedJournalEntry,
} from "@/types/entry.type";

interface RequestBody {
  entries: JournalEntryInput[];
}

export async function POST(req: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requestBody: RequestBody;
  try {
    requestBody = await req.json();
    if (!Array.isArray(requestBody.entries)) {
      throw new Error("Entries must be an array");
    }
  } catch (error) {
    console.error("Invalid request format ", error)
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }

  const validEntries = requestBody.entries.filter(
    (entry): entry is JournalEntryInput => {
      return (
        typeof entry.answer === "string" &&
        typeof entry.question === "string" &&
        entry.answer.trim() !== "" &&
        entry.question.trim() !== ""
      );
    }
  );

  if (validEntries.length === 0) {
    return NextResponse.json(
      { error: "No valid entries provided" },
      { status: 400 }
    );
  }

  const today = new Date();
  const clientTimezoneOffset = today.getTimezoneOffset() * 60000;
  const localDate = new Date(today.getTime() - clientTimezoneOffset);
  const dateString = localDate.toISOString().split("T")[0];

  try {
    const encryptedEntries: EncryptedJournalEntry[] = await Promise.all(
      validEntries.map(
        async (entry): Promise<EncryptedJournalEntry> => ({
          question: entry.question,
          answer: await encrypt(entry.answer),
          isEncrypted: true,
          createdAt: today.toISOString(),
          date: dateString,
          ...(entry.category && { category: entry.category }),
        })
      )
    );

    await saveJournalEntries(session.user.email, encryptedEntries);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Encryption failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Encryption failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getJournalEntries } from "@/lib/firebase/services";
import { decrypt } from "@/lib/webCrypto/encryption";

export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entries = await getJournalEntries(session.user.email);

    const decryptedEntries = await Promise.all(
      entries.map(async (entry) => {
        if (!entry.isEncrypted) return entry;

        try {
          const decryptedAnswer = await decrypt(entry.answer);
          return {
            ...entry,
            answer: decryptedAnswer,
            isEncrypted: false,
          };
        } catch (decryptError) {
          console.error(`Failed to decrypt entry ${entry.id}:`, decryptError);
          return {
            ...entry,
            answer: "[Error: Could not decrypt]",
            isEncrypted: false,
          };
        }
      })
    );

    return NextResponse.json(decryptedEntries);
  } catch (error) {
    console.error("Decryption failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to retrieve entries",
      },
      { status: 500 }
    );
  }
}
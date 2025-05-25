import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getJournalEntries } from "@/lib/firebase/services";
import { calculateJournalStats } from "@/utils/statsCalculator";
import { decrypt } from "@/lib/webCrypto/encryption";

export async function GET() {
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
    const stats = calculateJournalStats(decryptedEntries);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats calculation failed:", error);
    return NextResponse.json(
      { error: "Failed to calculate statistics" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getJournalEntries } from "@/lib/firebase/services";
import { calculateJournalStats } from "@/utils/statsCalculator";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entries = await getJournalEntries(session.user.email);
    const stats = calculateJournalStats(entries);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats calculation failed:", error);
    return NextResponse.json(
      { error: "Failed to calculate statistics" },
      { status: 500 }
    );
  }
}





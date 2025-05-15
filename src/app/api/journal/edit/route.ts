import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { updateJournalEntry } from "@/lib/firebase/services";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { date, content } = body;

  if (!date || !content) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    await updateJournalEntry(session.user.email, date, content);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to edit journal entries", err);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

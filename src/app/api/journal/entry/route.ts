import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import {
  updateJournalEntry,
  deleteJournalEntry,
} from "@/lib/firebase/services";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const body = await req.json();
  const { answer } = body;

  if (!id || !answer) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    await updateJournalEntry(session.user.email, id, answer);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update journal entry", err);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await deleteJournalEntry(session.user.email, id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete journal entry", err);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}

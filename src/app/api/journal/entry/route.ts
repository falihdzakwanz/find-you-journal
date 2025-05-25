import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import {
  updateJournalEntry,
  deleteJournalEntry,
  getJournalEntry,
} from "@/lib/firebase/services";
import { decrypt, encrypt } from "@/lib/webCrypto/encryption";

interface UpdateRequest {
  id: string;
  answer: string;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!session?.user?.email || !id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entry = await getJournalEntry(session.user.email, id);
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    const decryptedEntry = {
      ...entry,
      answer: await decrypt(entry.answer),
    };

    return NextResponse.json(decryptedEntry);
  } catch (error) {
    console.error("Failed to fetch entry:", error);
    return NextResponse.json(
      { error: "Failed to retrieve entry" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let updateData: UpdateRequest;
  try {
    updateData = await req.json();
    if (!updateData.id || !updateData.answer) {
      throw new Error("Missing required fields");
    }
  } catch (error) {
    console.error("Invalid request format ", error);
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }

  try {
    const encryptedAnswer = await encrypt(updateData.answer);
    await updateJournalEntry(session.user.email, updateData.id, {
      answer: encryptedAnswer,
      isEncrypted: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update entry",
      },
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

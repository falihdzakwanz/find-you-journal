import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options"; 
import { saveJournalEntry } from "@/lib/firebase/services";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();
  if (!content) {
    return NextResponse.json({ error: "No content provided" }, { status: 400 });
  }

  try {
    await saveJournalEntry(session.user.email, content);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save journal", err);
    return NextResponse.json(
      { error: "Failed to save journal" },
      { status: 500 }
    );
  }
}

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { forms } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, schema, isPublished } = await req.json();

    if (!name || !schema) {
      return NextResponse.json({ error: "Name and schema are required" }, { status: 400 });
    }

    const form = await db
      .insert(forms)
      .values({
        userId,
        name,
        description: description || null,
        schema,
        isPublished: isPublished || false,
      })
      .returning();

    return NextResponse.json(form[0]);
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userForms = await db
      .select()
      .from(forms)
      .where((table) => table.userId === userId);

    return NextResponse.json(userForms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

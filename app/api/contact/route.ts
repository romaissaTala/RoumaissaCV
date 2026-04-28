import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { ContactMessageModel } from "@/models";
import { sendContactEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Message trop court"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    await connectDB();

    // Save to DB
    await ContactMessageModel.create({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });

    // Send email
    await sendContactEmail({
      fromName: parsed.data.name,
      fromEmail: parsed.data.email,
      message: parsed.data.message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}

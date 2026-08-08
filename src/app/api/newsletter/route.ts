import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEmailDefaults, getMailer } from "@/lib/email";
import { saveNewsletterLead } from "@/lib/site-intake";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  locale: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const { fromEmail, newsletterInbox } = getEmailDefaults();
    const transporter = getMailer();

    await transporter.sendMail({
      from: `"Moreno Advisory Website" <${fromEmail}>`,
      to: newsletterInbox,
      replyTo: fromEmail,
      subject: `[Newsletter] ${data.email}`,
      html: `<p>New newsletter subscription from <strong>${data.email}</strong>${data.name ? ` (${data.name})` : ""}.</p>`,
      headers: {
        "X-Moreno-Lead-Type": "newsletter",
      },
    });

    try {
      await saveNewsletterLead({
        kind: "newsletter",
        email: data.email,
        name: data.name,
        locale: data.locale,
      });
    } catch (leadStorageError) {
      console.error("[Newsletter API] Lead storage failed:", leadStorageError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    console.error("[Newsletter API]", error);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
  }
}

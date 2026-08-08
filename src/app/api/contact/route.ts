import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEmailDefaults, getMailer } from "@/lib/email";
import { saveContactLead } from "@/lib/site-intake";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(20),
  honeypot: z.string().max(0).optional(),
  locale: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    const { contactInbox, fromEmail } = getEmailDefaults();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0D1B40; padding: 24px; text-align: center;">
          <h2 style="color: #C9A84C; margin: 0; font-size: 20px;">New Contact Inquiry — Moreno Advisory</h2>
        </div>
        <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #0D1B40;">${data.firstName} ${data.lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #0D1B40;"><a href="mailto:${data.email}" style="color: #1B3A8C;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #0D1B40;">${data.phone}</td></tr>` : ""}
            ${data.company ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Company</td><td style="padding: 8px 0; color: #0D1B40;">${data.company}</td></tr>` : ""}
            ${data.country ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Country</td><td style="padding: 8px 0; color: #0D1B40;">${data.country}</td></tr>` : ""}
            ${data.service ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Service</td><td style="padding: 8px 0; color: #0D1B40;">${data.service}</td></tr>` : ""}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #fff; border-left: 3px solid #C9A84C; border-radius: 2px;">
            <p style="margin: 0; color: #374151; line-height: 1.6;">${data.message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
        <div style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
          Moreno Advisory Website | ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST
        </div>
      </div>
    `;

    const transporter = getMailer();

    await transporter.sendMail({
      from: `"Moreno Advisory Website" <${fromEmail}>`,
      to: contactInbox,
      replyTo: data.email,
      subject: `[Site Contact] ${data.firstName} ${data.lastName} — ${data.service || "General"}`,
      html: emailHtml,
      headers: {
        "X-Moreno-Lead-Type": "contact-form",
        "X-Moreno-Language": "website",
      },
    });

    try {
      await saveContactLead({
        kind: "contact",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        country: data.country,
        service: data.service,
        message: data.message,
        locale: data.locale,
      });
    } catch (leadStorageError) {
      console.error("[Contact API] Lead storage failed:", leadStorageError);
    }

    try {
      await transporter.sendMail({
        from: `"Moreno Advisory" <${fromEmail}>`,
        to: data.email,
        replyTo: contactInbox,
        subject: "We received your message — Moreno Advisory",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0D1B40; padding: 24px; text-align: center;">
              <h2 style="color: #C9A84C; margin: 0;">Thank You, ${data.firstName}</h2>
            </div>
            <div style="padding: 32px; background: #f9fafb; border: 1px solid #e5e7eb;">
              <p style="color: #374151;">Thank you for reaching out to Moreno Advisory. We have received your message and a member of our team will respond within 24 business hours.</p>
              <p style="color: #374151;">If your matter is urgent, please reach us directly at <a href="mailto:${contactInbox}" style="color: #1B3A8C;">${contactInbox}</a>.</p>
              <p style="color: #6b7280; font-size: 14px;">Best regards,<br><strong>Moreno Advisory Team</strong></p>
            </div>
          </div>
        `,
      });
    } catch (autoReplyError) {
      console.error("[Contact API] Auto-reply failed:", autoReplyError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 });
    }
    console.error("[Contact API]", error);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
  }
}

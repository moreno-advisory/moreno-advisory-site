import nodemailer from "nodemailer";

const DEFAULT_FROM_EMAIL = "cemoreno@morenoadvisory.com";
const DEFAULT_CONTACT_EMAIL = "cemoreno+faleconosco@morenoadvisory.com";
const DEFAULT_NEWSLETTER_EMAIL = "cemoreno+newsletter@morenoadvisory.com";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required email environment variable: ${name}`);
  }
  return value;
}

function getPort(): number {
  const rawPort = process.env.SMTP_PORT?.trim();
  const port = rawPort ? Number(rawPort) : 587;

  if (!Number.isFinite(port)) {
    throw new Error(`Invalid SMTP_PORT value: ${rawPort}`);
  }

  return port;
}

function isSecure(port: number): boolean {
  const rawSecure = process.env.SMTP_SECURE?.trim().toLowerCase();
  if (rawSecure === "true") return true;
  if (rawSecure === "false") return false;
  return port === 465;
}

let cachedTransporter: nodemailer.Transporter | null = null;

export function getMailer() {
  if (cachedTransporter) return cachedTransporter;

  const host = getRequiredEnv("SMTP_HOST");
  const port = getPort();
  const secure = isSecure(port);
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: {
      user,
      pass,
    },
  });

  return cachedTransporter;
}

export function getEmailDefaults() {
  const fromEmail = process.env.SMTP_FROM_EMAIL?.trim() || process.env.SMTP_USER?.trim() || DEFAULT_FROM_EMAIL;

  return {
    fromEmail,
    contactInbox: process.env.CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL,
    newsletterInbox: process.env.NEWSLETTER_EMAIL?.trim() || process.env.CONTACT_EMAIL?.trim() || DEFAULT_NEWSLETTER_EMAIL,
  };
}

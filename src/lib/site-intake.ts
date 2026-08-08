type SiteLeadKind = "contact" | "newsletter";

interface BaseLeadRecord {
  kind: SiteLeadKind;
  locale?: string;
  source?: string;
}

export interface ContactLeadRecord extends BaseLeadRecord {
  kind: "contact";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  service?: string;
  message: string;
}

export interface NewsletterLeadRecord extends BaseLeadRecord {
  kind: "newsletter";
  email: string;
  name?: string;
}

function getSupabaseConfig() {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey };
}

async function insertRow(table: string, payload: Record<string, unknown>) {
  const config = getSupabaseConfig();
  if (!config) return;

  const response = await fetch(`${config.url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase insert failed for ${table}: ${errorText}`);
  }
}

export async function saveContactLead(record: ContactLeadRecord) {
  await insertRow("site_contact_messages", {
    first_name: record.firstName,
    last_name: record.lastName,
    full_name: `${record.firstName} ${record.lastName}`.trim(),
    email: record.email,
    phone: record.phone || null,
    company: record.company || null,
    country: record.country || null,
    service: record.service || null,
    message: record.message,
    locale: record.locale || "unknown",
    source: record.source || "website-contact-form",
    status: "new",
  });
}

export async function saveNewsletterLead(record: NewsletterLeadRecord) {
  await insertRow("newsletter_subscribers", {
    email: record.email,
    name: record.name || null,
    locale: record.locale || "unknown",
    source: record.source || "website-newsletter-form",
    status: "active",
  });
}

import { escapeHtml, validateRiskCheck, type RiskCheckInput } from "../../../lib/riskCheck";

// Best-effort rate limit: 5 requests per IP per 10 minutes.
// On serverless hosts each instance has its own memory, so treat this as spam friction, not a guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${body.slice(0, 300)}`);
  }
}

function leadEmail(lead: RiskCheckInput, ip: string) {
  const n = escapeHtml(lead.name);
  const e = escapeHtml(lead.email);
  const u = escapeHtml(lead.url);
  const when = new Date().toUTCString();
  return {
    subject: `New risk check: ${lead.url.replace(/^https?:\/\//, "")}`,
    html: `<h2>New free risk-check request</h2>
<p><strong>Name:</strong> ${n}<br>
<strong>Email:</strong> <a href="mailto:${e}">${e}</a><br>
<strong>Site:</strong> <a href="${u}">${u}</a><br>
<strong>Received:</strong> ${when}<br>
<strong>IP:</strong> ${escapeHtml(ip)}</p>
<p>Reply to this email to answer ${n} directly.</p>`,
    text: `New free risk-check request\n\nName: ${lead.name}\nEmail: ${lead.email}\nSite: ${lead.url}\nReceived: ${when}\nIP: ${ip}`,
  };
}

function confirmationEmail(lead: RiskCheckInput) {
  const first = escapeHtml(lead.name.split(" ")[0] || "there");
  const u = escapeHtml(lead.url);
  return {
    subject: "We got your Drupal risk-check request",
    html: `<p>Hi ${first},</p>
<p>Thanks for requesting a free risk check for <strong>${u}</strong>. You'll get a plain-English report within two business days.</p>
<p>If there's anything we should know about the site (hosting, custom features, deadlines), just reply to this email.</p>
<p>— Jani, Patchkeel</p>`,
    text: `Hi ${lead.name.split(" ")[0] || "there"},\n\nThanks for requesting a free risk check for ${lead.url}. You'll get a plain-English report within two business days.\n\nIf there's anything we should know about the site, just reply to this email.\n\n— Jani, Patchkeel`,
  };
}

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const { data, errors } = validateRiskCheck(body);
  if (!data) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const configured = process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL && process.env.LEAD_FROM_EMAIL;
  if (!configured) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[risk-check] Email not configured; lead received:", data);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[risk-check] RESEND_API_KEY / LEAD_TO_EMAIL / LEAD_FROM_EMAIL missing");
    return Response.json(
      { ok: false, error: "The form isn't set up yet. Please email us directly." },
      { status: 500 },
    );
  }

  try {
    await sendEmail({ to: process.env.LEAD_TO_EMAIL!, replyTo: data.email, ...leadEmail(data, ip) });
  } catch (err) {
    console.error("[risk-check] Failed to send lead email:", err);
    return Response.json(
      { ok: false, error: "Something went wrong sending your request. Please try again or email us directly." },
      { status: 502 },
    );
  }

  if (process.env.SEND_CONFIRMATION === "true") {
    // A failed confirmation shouldn't fail the request: the lead already reached you.
    await sendEmail({ to: data.email, replyTo: process.env.LEAD_TO_EMAIL, ...confirmationEmail(data) }).catch((err) =>
      console.error("[risk-check] Confirmation email failed:", err),
    );
  }

  return Response.json({ ok: true });
}

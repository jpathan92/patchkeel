// Shared validation for the free risk-check form (used by the browser and the API).

export type RiskCheckInput = {
  name: string;
  email: string;
  url: string;
};

export type RiskCheckErrors = Partial<Record<keyof RiskCheckInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HOST_RE = /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

/** Turns "example.org" or "https://www.example.org/about" into "https://www.example.org/about". */
export function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withScheme);
    if (!HOST_RE.test(u.hostname)) return null;
    return u.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function validateRiskCheck(input: Partial<Record<keyof RiskCheckInput, unknown>>): {
  data: RiskCheckInput | null;
  errors: RiskCheckErrors;
} {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const rawUrl = typeof input.url === "string" ? input.url : "";
  const errors: RiskCheckErrors = {};

  if (!name) errors.name = "Please add your name.";
  else if (name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";

  const url = normalizeUrl(rawUrl);
  if (!url || url.length > 300) errors.url = "Please enter your site address, like www.example.org.";

  if (Object.keys(errors).length) return { data: null, errors };
  return { data: { name, email, url: url! }, errors };
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

"use client";

import { useState, type FormEvent } from "react";
import { validateRiskCheck, type RiskCheckErrors } from "../../lib/riskCheck";

type Status = "idle" | "sending" | "sent" | "error";

export default function RiskCheckForm() {
  const [values, setValues] = useState({ name: "", email: "", url: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<RiskCheckErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const { errors: found } = validateRiskCheck(values);
    if (Object.keys(found).length) {
      setErrors(found);
      const first = Object.keys(found)[0];
      document.getElementById(`rc-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/risk-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerError(json.error ?? "Please check the highlighted fields.");
      setStatus("error");
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    const first = values.name.trim().split(" ")[0] || "there";
    return (
      <div className="form-card form-success" role="status" aria-live="polite">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="28" cy="28" r="25" />
          <path d="M17 29l7 7 15-16" />
        </svg>
        <h3>Request received</h3>
        <p>
          Thanks, {first}. Your risk report for <strong>{values.url}</strong> will land in {values.email} within two
          business days.
        </p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setValues({ name: "", email: "", url: "" });
            setStatus("idle");
          }}
        >
          Check another site
        </button>
      </div>
    );
  }

  const field = (key: keyof typeof values, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="field">
      <label htmlFor={`rc-${key}`}>{label}</label>
      <input
        id={`rc-${key}`}
        name={key}
        value={values[key]}
        onChange={update(key)}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `rc-${key}-err` : undefined}
        {...props}
      />
      {errors[key] && (
        <span id={`rc-${key}-err`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  );

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      {field("name", "Your name", { type: "text", autoComplete: "name", placeholder: "Jane Smith" })}
      {field("email", "Work email", { type: "email", autoComplete: "email", placeholder: "jane@example.org" })}
      {field("url", "Website URL", { type: "text", inputMode: "url", autoComplete: "url", placeholder: "www.example.org" })}

      {/* Honeypot for bots — hidden from people and screen readers */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="rc-company">Company website</label>
        <input id="rc-company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {serverError && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}

      <button type="submit" className="btn btn-dark btn-block" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my free risk check"}
      </button>
      <p className="form-note">We only scan publicly visible information. No login needed.</p>
    </form>
  );
}

# Patchkeel website

Next.js (App Router) landing page for Patchkeel. It's responsive, so the same code serves desktop and mobile. The free risk-check form emails each lead to you through [Resend](https://resend.com).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Without email settings, form submissions are printed in the terminal, so you can test the form right away.

## Turn on lead emails

1. Create a free Resend account and an API key.
2. In Resend, add and verify your domain (e.g. `patchkeel.com`) by adding the DNS records it gives you.
3. Copy `.env.example` to `.env.local` and fill it in:

| Variable | What it does |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `LEAD_TO_EMAIL` | Inbox where new requests arrive |
| `LEAD_FROM_EMAIL` | Sender, on your verified domain, e.g. `Patchkeel <leads@patchkeel.com>`. For quick tests, use `Patchkeel <onboarding@resend.dev>`. |
| `SEND_CONFIRMATION` | `true` also emails the visitor a "we got it" note |

Hitting **Reply** on a lead email answers the visitor directly.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, click **New Project**, import the repo, and add the four environment variables above.
3. Add your domain under **Settings → Domains**.

## How the form is protected

- Validation runs in the browser and again on the server (`lib/riskCheck.ts`).
- A hidden honeypot field silently drops most bots.
- There's a limit of 5 submissions per IP per 10 minutes. It's per server instance, so it adds friction for spammers but isn't a hard guarantee.
- User input is HTML-escaped before it goes into emails.
- In production, a missing email configuration returns an error, so leads are never silently lost.

## Files

- `app/page.tsx`: all page sections and copy (prices, plans, FAQ)
- `app/globals.css`: styles and breakpoints
- `app/components/RiskCheckForm.tsx`: the form (client side)
- `app/api/risk-check/route.ts`: form endpoint that sends the emails
- `app/components/SiteHeader.tsx`: header with the mobile menu

## Before launch

Replace `[Your photo]`, the `[count]` placeholders in the sample report, and the about-section placeholder line in `app/page.tsx`. Update `hello@patchkeel.com` if you use a different address.

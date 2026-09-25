import SiteHeader from "./components/SiteHeader";
import RiskCheckForm from "./components/RiskCheckForm";
import Logo, { Check } from "./components/Logo";

const problems = [
  {
    title: "No more security fixes",
    body: "Official support ended in January 2025. New vulnerabilities in core and contributed modules are no longer patched by the community.",
  },
  {
    title: "Aging hosting stack",
    body: "Hosts are retiring the old PHP versions D7 depends on. An upgrade you didn't plan for can break the site overnight.",
  },
  {
    title: "Audit and compliance flags",
    body: "Unsupported software shows up in security reviews, cyber-insurance forms and accessibility audits, usually at the worst time.",
  },
];

const services = [
  {
    step: "STEP 1 — AUDIT",
    title: "Migration audit",
    pre: "",
    price: "$950",
    post: "fixed · 5 business days",
    body: "A full inventory of your site and a written plan with a firm quote. Keep the plan whether or not you hire us.",
    items: ["Module and custom-code review", "Content model and data mapping", "Risk list and fixed-price quote"],
  },
  {
    step: "STEP 2 — MIGRATE",
    title: "Fixed-scope migration",
    pre: "from",
    price: "$8,000",
    post: "",
    body: "Your content, users and URLs moved to current Drupal on a modern stack, with your audit fee credited toward the project.",
    items: ["Content and media migration", "Redirects so you keep your SEO", "Staging review before launch"],
    featured: true,
  },
  {
    step: "STEP 3 — MAINTAIN",
    title: "Monthly care plan",
    pre: "from",
    price: "$400",
    post: "/ month",
    body: "Security updates, backups and monitoring handled for you, so the site never drifts out of support again.",
    items: ["Core and module security updates", "Daily backups, uptime alerts", "Monthly health report"],
  },
];

const plans = [
  {
    name: "Harbor",
    blurb: "For small sites that need to stay safe.",
    price: "$400",
    items: ["Security updates within 72 hours", "Daily off-site backups", "Uptime monitoring", "1 hour of fixes per month"],
  },
  {
    name: "Keel",
    blurb: "For organizations that update content often.",
    price: "$800",
    items: ["Everything in Harbor", "Critical patches within 24 hours", "4 hours of fixes and small changes", "Monthly health and performance report"],
    featured: true,
  },
  {
    name: "Fleet",
    blurb: "For multi-site setups and busy teams.",
    price: "$1,500",
    items: ["Everything in Keel", "Up to 3 sites covered", "10 hours of development per month", "Quarterly accessibility and security review"],
  },
];

const steps = [
  { title: "Free risk check", body: "Send your URL. Within two business days you get a short report on what's exposed." },
  { title: "Paid audit", body: "A deep review of the codebase and a fixed quote, delivered in five business days." },
  { title: "Migration", body: "We build on staging, you review, and we launch with redirects and a rollback plan." },
  { title: "Ongoing care", body: "Your care plan keeps the new site patched, backed up and watched every month." },
];

const faqs = [
  {
    q: "Can't we just leave the site as it is?",
    a: "You can for a while, but nobody is fixing new vulnerabilities in Drupal 7 anymore. The risk grows every month, and so does the eventual cost of moving.",
  },
  {
    q: "Will we lose content or search rankings?",
    a: "No. Content, media, users and URLs are migrated, and every old address gets a redirect. You review everything on staging before launch.",
  },
  {
    q: "Do we have to buy a care plan?",
    a: "No. The audit and migration stand on their own. Most clients add a plan so the new site doesn't fall behind the way the old one did.",
  },
  {
    q: "What if our site isn't on Drupal 7?",
    a: "Care plans cover Drupal 9, 10 and 11 sites too. Send your URL and we'll tell you where you stand.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section id="top" className="hero container">
          <div className="hero-copy">
            <div className="pill">
              <span className="dot" /> Drupal 7 end of life: January 5, 2025
            </div>
            <h1 className="display">
              Your Drupal 7 site is sailing without <em>security patches.</em>
            </h1>
            <p className="lead">
              Patchkeel moves legacy Drupal 7 sites to modern Drupal, then keeps them updated, backed up and monitored
              every month. Fixed prices, senior-level work, no surprises.
            </p>
            <div className="cta-row">
              <a href="#check" className="btn btn-accent btn-lg">
                Get a free risk check
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9h12M10 4l5 5-5 5" />
                </svg>
              </a>
              <a href="#pricing" className="btn btn-outline btn-lg">
                See pricing
              </a>
            </div>
          </div>

          <div className="report" aria-label="Sample risk report">
            <div className="report-bar">
              <span>patchkeel risk-check — sample report</span>
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="report-body">
              <div className="muted">$ patchkeel scan www.example-college.edu</div>
              <div className="row"><span>Drupal core</span><span className="warn">7.x — end of life</span></div>
              <div className="row"><span>PHP runtime</span><span className="warn">[version detected]</span></div>
              <div className="row"><span>Contrib modules</span><span>[count]</span></div>
              <div className="row"><span>Custom modules</span><span>[count]</span></div>
              <div className="row"><span>Content types</span><span>[count]</span></div>
              <hr />
              <div className="row"><span>Risk level</span><span className="badge">HIGH</span></div>
              <div className="row"><span>Recommended path</span><span className="ok">Migrate → Drupal 11</span></div>
              <div className="row"><span>Estimated effort</span><span>[weeks]</span></div>
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="audience">
          <div className="container audience-inner">
            <span className="eyebrow muted-ink">Built for</span>
            <ul>
              <li>Universities</li>
              <li>Nonprofits</li>
              <li>Local government</li>
              <li>Growing businesses</li>
            </ul>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section container">
          <div className="section-head split">
            <h2 className="h2">Still running Drupal 7? Here&apos;s what that means today.</h2>
            <p className="body-lg">
              The site still loads, so it&apos;s easy to put off. But every month on an unsupported platform adds risk you
              can&apos;t see from the homepage.
            </p>
          </div>
          <div className="grid-3">
            {problems.map((p, i) => (
              <div key={p.title} className="card">
                <span className="num">0{i + 1}</span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section-dark">
          <div className="section container">
            <div className="section-head">
              <span className="eyebrow accent-light">Three ways to work together</span>
              <h2 className="h2 light">Start small. Know the price before any work begins.</h2>
            </div>
            <div className="grid-3">
              {services.map((s) => (
                <div key={s.title} className={`svc${s.featured ? " svc-featured" : ""}`}>
                  <span className="mono-sm">{s.step}</span>
                  <h3 className="h3-serif">{s.title}</h3>
                  <div className="price">
                    {s.pre && <span className="price-note">{s.pre}</span>}
                    <span className="price-num">{s.price}</span>
                    {s.post && <span className="price-note">{s.post}</span>}
                  </div>
                  <p>{s.body}</p>
                  <ul className="checks">
                    {s.items.map((it) => (
                      <li key={it}>
                        <Check color="#8FD3C1" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section container">
          <div className="section-head center">
            <span className="eyebrow accent">Care plans</span>
            <h2 className="h2">Pick the level of care your site needs.</h2>
            <p className="body-lg">Month to month. Cancel with 30 days&apos; notice. Unused support hours don&apos;t roll over.</p>
          </div>
          <div className="grid-3 plans">
            {plans.map((p) => (
              <div key={p.name} className={`plan${p.featured ? " plan-featured" : ""}`}>
                <div>
                  <div className="plan-title">
                    <h3 className="h3-serif">{p.name}</h3>
                    {p.featured && <span className="tag">Most popular</span>}
                  </div>
                  <p className="plan-blurb">{p.blurb}</p>
                </div>
                <div className="price">
                  <span className="price-big">{p.price}</span>
                  <span className="price-note">/ month</span>
                </div>
                <ul className="checks">
                  {p.items.map((it) => (
                    <li key={it}>
                      <Check color={p.featured ? "#8FD3C1" : "#0F766E"} />
                      {it}
                    </li>
                  ))}
                </ul>
                <a href="#check" className={`btn btn-block ${p.featured ? "btn-accent" : "btn-outline"}`}>
                  Choose {p.name}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section-sand">
          <div className="section container">
            <h2 className="h2 narrow">From &ldquo;we should deal with that&rdquo; to done, in four steps.</h2>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3 className="h3">{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section container about">
          <div className="photo">[Your photo]</div>
          <div className="about-copy">
            <span className="eyebrow accent">Who you&apos;ll work with</span>
            <h2 className="h2">A senior Drupal engineer, not an account manager.</h2>
            <p className="body-lg">
              Patchkeel is run by Jani, a Drupal developer and consultant with 8+ years of experience building and
              maintaining Drupal sites for enterprise teams. You&apos;ll talk directly to the person doing the work.
            </p>
            <p className="body-lg">[Add a line about a past project or client type you can name publicly.]</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section container faq">
          <h2 className="h2">Common questions</h2>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="check" className="container">
          <div className="cta">
            <div className="cta-copy">
              <h2 className="h2 light">Find out how exposed your site is. Free.</h2>
              <p>Send your URL and get a plain-English risk report within two business days. No sales call required.</p>
            </div>
            <RiskCheckForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand light">
                <Logo size={30} />
                <span>Patchkeel</span>
              </div>
              <p>Drupal 7 migrations and monthly care plans for organizations that can&apos;t afford downtime.</p>
            </div>
            <div className="footer-cols">
              <div>
                <span className="eyebrow">Services</span>
                <a href="#services">Migration audit</a>
                <a href="#services">D7 migration</a>
                <a href="#pricing">Care plans</a>
              </div>
              <div>
                <span className="eyebrow">Contact</span>
                <a href="mailto:hello@patchkeel.com">hello@patchkeel.com</a>
                <span>North Carolina, USA</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Patchkeel LLC</span>
            <span>Drupal is a registered trademark of Dries Buytaert. Patchkeel is not affiliated with the Drupal Association.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

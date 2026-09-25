"use client";

import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Care plans" },
  { href: "#process", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={close}>
          <Logo />
          <span>Patchkeel</span>
        </a>

        <nav className="nav-desktop" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#check" className="btn btn-dark btn-sm">
            Free D7 risk check
          </a>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="nav-mobile" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a href="#check" className="btn btn-dark btn-block" onClick={close}>
            Free D7 risk check
          </a>
        </nav>
      )}
    </header>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo" id="nav-logo">
          <div className="logo-icon">🔧</div>
          Plain<span>Tools</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar-nav" role="menubar">
          <li role="none"><Link href="/pdf-tools" role="menuitem">PDF Tools</Link></li>
          <li role="none"><Link href="/templates" role="menuitem">Templates</Link></li>
          <li role="none"><Link href="/privacy-security" role="menuitem">Privacy</Link></li>
          <li role="none"><Link href="/anonymous-reporting" role="menuitem">Report</Link></li>
          <li role="none"><Link href="/about" role="menuitem">About</Link></li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="navbar-menu-btn"
          id="mobile-menu-btn"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar-mobile-menu" id="mobile-menu" role="menu">
          <Link href="/pdf-tools" role="menuitem" onClick={() => setMobileOpen(false)}>📄 PDF Tools</Link>
          <Link href="/templates" role="menuitem" onClick={() => setMobileOpen(false)}>📝 Templates</Link>
          <Link href="/privacy-security" role="menuitem" onClick={() => setMobileOpen(false)}>🔒 Privacy & Security</Link>
          <Link href="/anonymous-reporting" role="menuitem" onClick={() => setMobileOpen(false)}>🛡️ Anonymous Report</Link>
          <Link href="/about" role="menuitem" onClick={() => setMobileOpen(false)}>ℹ️ About</Link>
        </div>
      )}
    </nav>
  );
}

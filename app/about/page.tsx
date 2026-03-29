'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="about-page container">
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span className="current">About</span>
      </nav>

      <section className="about-hero">
        <h1 className="display-font">About Plain Tools</h1>
        <p className="tagline">The internet's utility drawer. Fast, clean, and impossible to mess up.</p>
      </section>

      <div className="about-body glass">
        <section className="section">
          <h2>What We Are</h2>
          <p>
            Plain Tools is a free utility hub built for everyday people — not power users. We believe that compressing a PDF, 
            writing an NDA, or reporting something anonymously shouldn't require a PhD, a credit card, or creating yet another 
            account somewhere.
          </p>
          <p>
            Every tool on this site works entirely in your browser. We don't upload your files to a server. 
            We don't log your IP. We don't sell your data. We don't even know who you are.
          </p>
        </section>

        <section className="section">
          <h2>Our Promises</h2>
          <ul className="promise-list">
            <li>✅ <strong>No account required</strong> for any basic tool</li>
            <li>✅ <strong>No file storage</strong> — all processing happens in-browser</li>
            <li>✅ <strong>Mobile-first</strong> — designed for phones first, then desktops</li>
            <li>✅ <strong>Plain English everywhere</strong> — if a 12-year-old wouldn't understand it, we rewrote it</li>
            <li>✅ <strong>Free forever</strong> for core tools — no hidden trials</li>
          </ul>
        </section>

        <section className="section">
          <h2>Who Builds This?</h2>
          <p>
            Plain Tools is a project by <strong>Sovereign Ridge Partners LLC</strong>, a small tech company focused on 
            building useful, privacy-first digital utilities. We're not a VC-funded startup trying to grow to millions of users 
            and then sell your data. We're a small team that builds tools we'd want to use ourselves.
          </p>
        </section>

        <section className="section cta-section">
          <h2>Start Using a Tool</h2>
          <div className="cta-links">
            <Link href="/pdf-tools" className="btn btn-primary">PDF Tools →</Link>
            <Link href="/templates" className="btn btn-secondary">Free Templates →</Link>
            <Link href="/anonymous-reporting" className="btn btn-secondary">Anonymous Tools →</Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page { padding: 3rem 0 6rem; max-width: 860px; }
        .breadcrumb { display: flex; gap: 0.75rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 3rem; }
        .separator { color: var(--text-dim); }
        .about-hero { text-align: center; margin-bottom: 3rem; }
        .display-font { font-size: 3.5rem; margin-bottom: 1rem; }
        .tagline { font-size: 1.25rem; color: var(--text-muted); }
        
        .about-body { padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border); }
        .section { margin-bottom: 3rem; }
        .section:last-child { margin-bottom: 0; }
        .section h2 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-main); }
        .section p { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1rem; }
        .promise-list { list-style: none; display: flex; flex-direction: column; gap: 0.85rem; }
        .promise-list li { font-size: 1.05rem; color: var(--text-muted); }
        .promise-list strong { color: var(--text-main); }

        .cta-section h2 { text-align: center; }
        .cta-links { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem; }

        @media (max-width: 768px) {
          .display-font { font-size: 2.25rem; }
          .about-body { padding: 2rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}

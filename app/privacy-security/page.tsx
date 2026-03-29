'use client';

import Link from 'next/link';

export default function PrivacySecurityPage() {
  const guides = [
    { id: 'remove-yourself', title: 'Remove Yourself From the Internet', desc: 'Step-by-step guide to opt out of data broker sites.', icon: '🗑️', soon: false, route: '/privacy-security/remove-yourself-from-internet' },
    { id: 'best-vpn', title: 'Best Free VPNs', desc: 'Our unsponsored picks for the best privacy-first VPNs.', icon: '🔐', soon: false, route: '/privacy-security/best-vpn' },
    { id: 'password-audit', title: 'Password Strength Audit', desc: 'Check if your password habits are putting you at risk. (Soon)', icon: '🔑', soon: true, route: '#' },
    { id: 'email-leak', title: 'Email Leak Check', desc: 'See if your email appeared in a data breach. (Soon)', icon: '📧', soon: true, route: '#' },
  ];

  return (
    <div className="category-hub container">
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span className="current">Privacy & Security</span>
      </nav>

      <section className="hub-hero">
        <h1 className="display-font">Privacy & Security</h1>
        <p className="hero-desc">Free guides and tools to protect your identity, secure your browsing, and reclaim your data. No signup required.</p>
      </section>

      <div className="tool-grid">
        {guides.map(g => (
          <Link key={g.id} href={g.route} className={`tool-card glass-hover ${g.soon ? 'disabled' : ''}`}>
            <div className="icon">{g.icon}</div>
            <div className="content">
              <h3>{g.title} {g.soon && <small>(Soon)</small>}</h3>
              <p>{g.desc}</p>
            </div>
            {!g.soon && <span className="arrow">→</span>}
          </Link>
        ))}
      </div>

      <style jsx>{`
        .category-hub { padding: 3rem 0 6rem; }
        .breadcrumb { display: flex; gap: 0.75rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 3rem; }
        .hub-hero { text-align: center; margin-bottom: 4rem; }
        .display-font { font-size: 3.5rem; margin-bottom: 1rem; }
        .hero-desc { font-size: 1.25rem; color: var(--text-muted); max-width: 700px; margin: 0 auto; }
        
        .tool-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .tool-card { display: flex; align-items: center; padding: 2rem; background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius-lg); position: relative; transition: all 0.3s ease; }
        .icon { font-size: 2.5rem; margin-right: 1.5rem; flex-shrink: 0; }
        .content h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .content p { font-size: 0.95rem; color: var(--text-muted); }
        .arrow { position: absolute; right: 2rem; color: var(--primary); font-size: 1.25rem; opacity: 0; transition: all 0.3s; }
        
        .tool-card:hover:not(.disabled) { transform: translateY(-5px); border-color: var(--primary); background: var(--primary-light); }
        .tool-card:hover .arrow { opacity: 1; transform: translateX(5px); }
        
        .disabled { opacity: 0.6; cursor: not-allowed; }
        
        @media (max-width: 768px) {
           .tool-grid { grid-template-columns: 1fr; }
           .display-font { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

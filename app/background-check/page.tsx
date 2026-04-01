'use client';

import Link from 'next/link';

export default function BackgroundCheckHub() {
  const tools = [
    { id: 'person-search', title: 'Look Someone Up', desc: 'Find public contact info, alternate names, and location history. (Soon)', icon: '🕵️', soon: true, route: '#' },
    { id: 'criminal-records', title: 'Criminal Records', desc: 'Search for public arrest histories and court records. (Soon)', icon: '⚖️', soon: true, route: '#' },
    { id: 'reverse-phone', title: 'Reverse Phone Lookup', desc: 'Find out exactly who keeps calling from that unknown number. (Soon)', icon: '📱', soon: true, route: '#' },
    { id: 'property-search', title: 'Property Lookup', desc: 'See who officially owns a house or building. (Soon)', icon: '🏠', soon: true, route: '#' },
  ];

  return (
    <div className="category-hub container">
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span className="current">Background Checks</span>
      </nav>

      <section className="hub-hero">
        <h1 className="display-font">Person Search</h1>
        <p className="hero-desc">Look up people, numbers, and properties. We handle the hard part of finding official records so you don't have to be a detective.</p>
        
        <div className="plain-english-helper" style={{marginTop: '1.5rem'}}>
          We are currently setting up our verified partnership with TruthFinder to make these tools incredibly powerful. Check back shortly!
        </div>
      </section>

      <div className="tool-grid">
        {tools.map(g => (
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

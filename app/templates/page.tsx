'use client';

const TEMPLATES = [
  { id: 'invoice-template', title: 'Invoice Template', desc: 'Professional, ready-to-bill invoice. Instant PDF download.', icon: '💰', route: '/templates/invoice-template' },
  { id: 'nda-template', title: 'NDA Template', desc: 'Securely fill an NDA to protect your confidential info.', icon: '🔇', route: '/templates/nda-template' },
  { id: 'lease-agreement', title: 'Lease Agreement', desc: 'Simple, legally standard lease agreement for rentals. (Soon)', icon: '🏠', route: '/templates/lease-agreement', disabled: true },
  { id: 'resignation-letter', title: 'Resignation Letter', desc: 'Politic, professional way to leave your current role. (Soon)', icon: '👋', route: '/templates/resignation-letter', disabled: true }
];

export default function TemplatesHub() {
  return (
    <div className="category-hub container">
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <span className="separator">/</span>
        <span className="current">Templates</span>
      </nav>

      <section className="hub-hero">
        <h1 className="display-font">Free fillable Templates</h1>
        <p className="hero-desc">Professional document templates you can fill in real-time and download for free. Zero signup required.</p>
      </section>

      <div className="tool-grid">
         {TEMPLATES.map(tool => (
           <a key={tool.id} href={tool.disabled ? '#' : tool.route} className={`tool-card glass-hover ${tool.disabled ? 'disabled' : ''}`}>
             <div className="icon">{tool.icon}</div>
             <div className="content">
               <h3>{tool.title} {tool.disabled && <small>(Soon)</small>}</h3>
               <p>{tool.desc}</p>
             </div>
             {!tool.disabled && <span className="arrow">→</span>}
           </a>
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
        .icon { font-size: 2.5rem; margin-right: 1.5rem; }
        .content h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .content p { font-size: 0.95rem; color: var(--text-muted); }
        .arrow { position: absolute; right: 2rem; color: var(--primary); font-size: 1.25rem; opacity: 0; transition: all 0.3s; }
        
        .tool-card:hover:not(.disabled) { transform: translateY(-5px); border-color: var(--primary); background: var(--primary-light); }
        .tool-card:hover .arrow { opacity: 1; transform: translateX(5px); }
        
        .disabled { opacity: 0.6; cursor: not-allowed; grayscale: 1; }
        
        @media (max-width: 768px) {
           .tool-grid { grid-template-columns: 1fr; }
           .display-font { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

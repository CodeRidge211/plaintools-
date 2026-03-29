'use client';

import Link from "next/link";

const ANONYMOUS_TOOLS = [
  { id: 'anonymous-tip', title: 'Anonymous Tip Form', desc: 'Report an issue or share information without leaving an IP trail.', icon: '🕵️', route: '/anonymous-reporting/anonymous-tip-form' },
  { id: 'private-message', title: 'Private Message', desc: 'Send a one-time viewing message that deletes itself. (Soon)', icon: '🔒', route: '/anonymous-reporting/private-message', disabled: true },
  { id: 'burn-after-reading', title: 'File Burner', desc: 'Upload a file that can only be downloaded once. (Soon)', icon: '🔥', route: '/anonymous-reporting/file-burner', disabled: true }
];

export default function AnonymousHub() {
  return (
    <div className="category-hub container">
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span className="current">Anonymous Tools</span>
      </nav>

      <section className="hub-hero">
        <h1 className="display-font">Anonymous Utilities</h1>
        <p className="hero-desc">Tools designed for privacy. We never store your IP address, browser fingerprint, or identity details.</p>
      </section>

      <div className="tool-grid">
         {ANONYMOUS_TOOLS.map(tool => (
           <Link 
             key={tool.id} 
             href={tool.disabled ? '#' : tool.route} 
             className={`tool-card glass-hover ${tool.disabled ? 'disabled' : ''}`}
           >
             <div className="icon">{tool.icon}</div>
             <div className="content">
               <h3>{tool.title} {tool.disabled && <small>(Soon)</small>}</h3>
               <p>{tool.desc}</p>
             </div>
             {!tool.disabled && <span className="arrow">→</span>}
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

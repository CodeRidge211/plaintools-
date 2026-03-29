'use client';
import Link from 'next/link';

const CATEGORIES = [
  { 
    id: 'pdf-tools', 
    title: 'PDF Utilities', 
    desc: 'Compress, merge, split, and edit PDFs in your browser. Fast and private.', 
    icon: '📄', 
    route: '/pdf-tools' 
  },
  { 
    id: 'anonymous-reporting', 
    title: 'Anonymous Tools', 
    desc: 'Send reports and messages without revealing your identity or IP address.', 
    icon: '🕵️', 
    route: '/anonymous-reporting' 
  },
  { 
    id: 'templates', 
    title: 'Free Templates', 
    desc: 'Fillable forms for invoices, legal docs, HR, and more. Download as PDF.', 
    icon: '📋', 
    route: '/templates' 
  },
  { 
    id: 'privacy-security', 
    title: 'Privacy & Security', 
    desc: 'Remove yourself from the internet, secure your VPN, and find leaks.', 
    icon: '🛡️', 
    route: '/privacy-security' 
  },
  { 
    id: 'file-converters', 
    title: 'File Converters', 
    desc: 'Change HEIC to JPG, Image to PNG, and more with zero processing lag.', 
    icon: '🔁', 
    route: '/file-converters' 
  },
  { 
    id: 'background-check', 
    title: 'Person Search', 
    desc: 'Look someone up, verify identities, and check public records easily.', 
    icon: '🔍', 
    route: '/background-check' 
  }
];

export default function CategoryGrid() {
  return (
    <section id="category-grid" className="category-section">
      <h2 className="section-title">Common Utilities</h2>
      <div className="grid">
        {CATEGORIES.map(cat => (
          <Link key={cat.id} href={cat.route} className="cat-card glass-hover">
            <div className="cat-icon">{cat.icon}</div>
            <h3 className="cat-title">{cat.title}</h3>
            <p className="plain-english-helper">🖱️ Click one of these collections to see all {cat.title.toLowerCase()}.</p>
            <p className="cat-desc">{cat.desc}</p>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .category-section {
          padding: 4rem 0;
          text-align: center;
        }

        .section-title {
          margin-bottom: 2.5rem;
          font-size: 1.8rem;
          color: var(--text-main);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .cat-card {
          padding: 2.5rem 2rem;
          background: var(--bg-card);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .cat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, var(--primary-glow), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .cat-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px var(--primary-light);
        }

        .cat-card:hover::before {
          opacity: 0.1;
        }

        .cat-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
        }

        .cat-title {
          font-size: 1.4rem;
          margin-bottom: 0.85rem;
          color: var(--text-main);
          font-family: var(--font-display);
        }

        .cat-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .cat-card {
            padding: 2rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}

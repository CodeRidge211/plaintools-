'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SEARCH_MAPPINGS = [
  { keywords: ['compress pdf', 'make pdf smaller', 'reduce pdf size'], route: '/pdf-tools/compress-pdf' },
  { keywords: ['report anonymously', 'anonymous report', 'tip line', 'anonymous report form'], route: '/anonymous-reporting/anonymous-tip-form' },
  { keywords: ['invoice template', 'free invoice', 'make invoice'], route: '/templates/invoice-template' },
  { keywords: ['remove myself from internet', 'delete my data', 'privacy help'], route: '/privacy-security/remove-yourself-from-internet' },
  { keywords: ['background check', 'look someone up', 'search person'], route: '/background-check/free-background-check' },
  { keywords: ['merge pdf', 'combine pdf', 'join pdf'], route: '/pdf-tools/merge-pdf' },
  { keywords: ['nda template', 'non disclosure', 'legal agreement'], route: '/templates/nda-template' },
  { keywords: ['vpn', 'protect my internet', 'private browsing'], route: '/privacy-security/best-vpn' },
  { keywords: ['split pdf', 'divide pdf'], route: '/pdf-tools/split-pdf' },
  { keywords: ['heic to jpg', 'iphone image converter'], route: '/file-converters/heic-to-jpg' },
] as const;

export default function SmartSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ keywords: readonly string[], route: string }>>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const filtered = SEARCH_MAPPINGS.filter(m => 
      m.keywords.some(kw => kw.toLowerCase().includes(query.toLowerCase()))
    );
    setSuggestions(filtered.slice(0, 5));
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const matched = SEARCH_MAPPINGS.find(m => 
      m.keywords.some(kw => kw.toLowerCase() === query.toLowerCase().trim())
    );

    if (matched) {
      router.push(matched.route);
    } else if (suggestions.length > 0) {
      router.push(suggestions[0].route);
    } else {
      // Fallback: move to category grid or show no result message
      const grid = document.getElementById('category-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-bar-form">
        <label htmlFor="main-search" className="sr-only">What do you need to do today?</label>
        <div className="search-input-wrapper glass">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="main-search"
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="e.g. compress a PDF, report something anonymously..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary search-btn">Search</button>
        </div>
        
        <p className="plain-english-helper" style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--accent)' }}>
          🔍 Type what you want to do (like "compress pdf") and we'll take you there instantly.
        </p>
        
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown glass">
            {suggestions.map((m, idx) => (
              <Link
                key={idx}
                href={m.route}
                className="suggestion-item"
                onClick={() => {
                  setQuery(m.keywords[0]);
                }}
              >
                <div className="suggestion-content">
                  <span className="suggestion-kw">{m.keywords[0]}</span>
                  <p className="suggestion-desc">Quick jump &rarr;</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </form>
      
      <p className="search-tagline">
        Free tools for real life. No signup. No fluff.
      </p>

      <style jsx>{`
        .search-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .search-bar-form {
          position: relative;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          padding: 0.5rem 0.5rem 0.5rem 1.5rem;
          border-radius: 40px;
          gap: 1rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
          background: rgba(15, 23, 42, 0.4);
        }

        .search-input-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 1px var(--primary), 0 0 20px var(--primary-light);
          background: rgba(15, 23, 42, 0.8);
        }

        .search-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          font-size: 1.15rem;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-main);
          padding: 0.5rem 0;
        }

        .search-btn {
          border-radius: 30px;
          padding: 0.6rem 1.5rem;
          font-size: 0.95rem;
        }

        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0.75rem;
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding: 0.5rem;
          box-shadow: var(--shadow-lg);
          animation: slideDown 0.2s ease;
        }

        .suggestion-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          text-align: left;
          transition: background 0.2s;
        }

        .suggestion-item:hover {
          background: var(--primary-light);
        }

        .suggestion-kw {
          font-weight: 500;
          color: var(--text-main);
        }

        .suggestion-route {
          font-size: 0.8rem;
          color: var(--primary);
          opacity: 0.8;
        }

        .search-tagline {
          text-align: center;
          margin-top: 1.5rem;
          font-weight: 500;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .search-input {
            font-size: 1rem;
          }
          .search-btn {
            display: none;
          }
          .search-input-wrapper {
            padding: 0.75rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

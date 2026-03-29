import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand-name">🔧 PlainTools</div>
            <p className="footer-brand-desc">
              Free tools for real life. No account. No fluff. No file storage.
              Everything runs in your browser where possible.
            </p>
          </div>

          {/* Tools */}
          <div>
            <div className="footer-col-title">Tools</div>
            <ul className="footer-links">
              <li><Link href="/pdf-tools/compress-pdf">Compress PDF</Link></li>
              <li><Link href="/pdf-tools/merge-pdf">Merge PDFs</Link></li>
              <li><Link href="/pdf-tools/split-pdf">Split PDF</Link></li>
              <li><Link href="/pdf-tools">All PDF Tools</Link></li>
            </ul>
          </div>

          {/* Templates */}
          <div>
            <div className="footer-col-title">Templates</div>
            <ul className="footer-links">
              <li><Link href="/templates/invoice-template">Invoice</Link></li>
              <li><Link href="/templates/nda-template">NDA</Link></li>
              <li><Link href="/templates/resignation-letter">Resignation Letter</Link></li>
              <li><Link href="/templates">All Templates</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/anonymous-reporting">Anonymous Report</Link></li>
              <li><Link href="/sitemap.xml">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {year} PlainTools. All rights reserved. Part of Sovereign Ridge Partners LLC.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/privacy-policy" style={{ color: 'var(--gray-400)', fontSize: '0.8rem', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/about" style={{ color: 'var(--gray-400)', fontSize: '0.8rem', textDecoration: 'none' }}>About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

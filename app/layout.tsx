import type { Metadata } from "next";
import "./globals.css";
import PlainEnglishToggle from "@/components/Layout/PlainEnglishToggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Plain Tools | Free, No Signup Utility Hub",
  description: "Fast, clean, and impossible to mess up tools for everyday life. No signup required for core functionality. Mobile-first utility hub.",
  keywords: ["free tools", "no signup tools", "pdf compressor", "anonymous report", "template filler", "plain english tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <div className="layout-wrapper">
          <header className="site-header container">
            <Link href="/" className="logo">
              Plain<span>Tools</span>
            </Link>
            
            <nav className="main-nav">
              <Link href="/pdf-tools" className="nav-link">Tools</Link>
              <Link href="/templates" className="nav-link">Templates</Link>
              <Link href="/privacy-security" className="nav-link">Privacy</Link>
              <Link href="/about" className="nav-link">About</Link>
              <PlainEnglishToggle />
            </nav>
            
            {/* Mobile Nav Trigger (could be added later) */}
          </header>

          <main id="main-content">
            {children}
          </main>

          <footer className="site-footer">
            <div className="container footer-grid">
              <div className="footer-brand">
                <div className="logo">
                  Plain<span>Tools</span>
                </div>
                <p>
                  The internet's utility drawer. Fast, clean, and impossible to mess up. 
                  Free tools for real life. No signup. No fluff.
                </p>
              </div>
              
              <div className="footer-col">
                <h4>Legal</h4>
                <ul className="footer-links">
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
                  <li><Link href="/disclosure">Affiliate Disclosure</Link></li>
                </ul>
              </div>
              
              <div className="footer-col">
                <h4>Tools</h4>
                <ul className="footer-links">
                  <li><Link href="/pdf-tools">PDF Utilities</Link></li>
                  <li><Link href="/anonymous-reporting">Anonymous Reporting</Link></li>
                  <li><Link href="/templates">Document Templates</Link></li>
                </ul>
              </div>
              
              <div className="footer-col">
                <h4>Support</h4>
                <ul className="footer-links">
                  <li><Link href="/report">Report an Issue</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><a href="mailto:support@theplaintools.com">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="container footer-bottom">
              <p>&copy; {new Date().getFullYear()} Sovereign Ridge Partners LLC. Confidential.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://coderidge.com" target="_blank" rel="noopener noreferrer">CodeRidge</a>
                <a href="https://boring-search.com" target="_blank" rel="noopener noreferrer">Boring Search</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

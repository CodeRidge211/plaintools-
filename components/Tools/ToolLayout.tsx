'use client';
import React from 'react';
import Link from 'next/link';

interface ToolLayoutProps {
  category: string;
  categoryUrl: string;
  toolName: string;
  headline: string;
  trustLine: string;
  description: React.ReactNode;
  howItWorks: Array<{ icon: string; title: string; desc: string }>;
  faqs: Array<{ question: string; answer: string }>;
  children: React.ReactNode;
}

export default function ToolLayout({
  category,
  categoryUrl,
  toolName,
  headline,
  trustLine,
  description,
  howItWorks,
  faqs,
  children
}: ToolLayoutProps) {
  return (
    <div className="tool-page-wrapper">
      <div className="container">
        {/* 1. Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <Link href={categoryUrl}>{category}</Link>
          <span className="separator">/</span>
          <span className="current">{toolName}</span>
        </nav>

        {/* 2. Headline & 3. Trust Line */}
        <div className="tool-info">
          <h1 className="tool-h1">{headline}</h1>
          <p className="trust-line">🛡️ {trustLine}</p>
        </div>

        {/* 4. THE TOOL */}
        <section className="tool-primary-section glass">
          {children}
        </section>

        {/* 5. How it works */}
        <section className="how-it-works">
          <h2 className="section-title">How it works</h2>
          <div className="steps-grid">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Body Content */}
        <section className="tool-body-content">
          {description}
        </section>

        {/* 7. FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, idx) => (
              <details key={idx} className="faq-item glass">
                <summary className="faq-question">{faq.question}</summary>
                <div className="faq-answer">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .tool-page-wrapper {
          padding: 3rem 0 6rem;
        }

        .breadcrumb {
          display: flex;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .separator {
          color: var(--text-dim);
        }

        .current {
          color: var(--foreground);
          font-weight: 500;
        }

        .tool-info {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .tool-h1 {
          font-size: 3rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.04em;
        }

        .trust-line {
          font-weight: 500;
          color: var(--success);
          font-size: 0.95rem;
        }

        .tool-primary-section {
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 3.5rem;
          margin-bottom: 5rem;
          box-shadow: var(--shadow-lg);
        }

        .section-title {
          margin-bottom: 2.5rem;
          font-size: 1.8rem;
          text-align: center;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .step-card {
          padding: 2rem;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-align: center;
        }

        .step-icon {
          font-size: 2rem;
          margin-bottom: 1.25rem;
        }

        .step-content h3 {
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
        }

        .step-content p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .tool-body-content {
          max-width: 800px;
          margin: 0 auto 5rem;
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-muted);
        }

        .faq-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
        }

        .faq-item {
          padding: 1rem 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          transition: all 0.3s;
        }

        .faq-item[open] {
          background: var(--primary-light);
          border-color: var(--primary);
        }

        .faq-question {
          font-weight: 600;
          cursor: pointer;
          font-size: 1.05rem;
          list-style: none;
          position: relative;
          padding-right: 2rem;
        }

        .faq-question::after {
          content: '↓';
          position: absolute;
          right: 0;
          top: 0;
          transition: transform 0.3s;
        }

        .faq-item[open] .faq-question::after {
          transform: rotate(180deg);
        }

        .faq-answer {
          margin-top: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          border-top: 1px solid var(--border);
          padding-top: 1rem;
        }

        @media (max-width: 768px) {
          .tool-h1 {
            font-size: 2rem;
          }
          .tool-primary-section {
            padding: 2rem 1.5rem;
          }
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

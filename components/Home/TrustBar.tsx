'use client';

const TRUST_ITEMS = [
  { icon: '🆓', title: '100% Free Forever', desc: 'No subscriptions, no hidden fees for basic tools.' },
  { icon: '🔒', title: 'We Never Store Your Files', desc: 'All processing stays in your browser. Complete privacy.' },
  { icon: '✨', title: 'No Signup Required', desc: 'Use our tools instantly without an account.' }
];

export default function TrustBar() {
  return (
    <div className="trust-bar container">
      <div className="trust-wrapper glass">
        {TRUST_ITEMS.map((item, idx) => (
          <div key={idx} className="trust-item">
            <div className="trust-icon">{item.icon}</div>
            <div className="trust-content">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trust-bar {
          margin-top: 3rem;
          margin-bottom: 5rem;
        }

        .trust-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: #080a0f;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          gap: 3rem;
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
        }

        .trust-wrapper::after {
          content: '';
          position: absolute;
          top: -20%; left: -20%; width: 140%; height: 140%;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .trust-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .trust-content h4 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
          color: var(--text-main);
        }

        .trust-content p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .trust-wrapper {
            grid-template-columns: 1fr;
            padding: 2rem;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

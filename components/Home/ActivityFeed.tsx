'use client';

import { useState, useEffect } from 'react';

const SEED_ACTIVITIES = [
  "Someone just compressed a 47MB PDF to 2MB",
  "A new Invoice was generated from the London hub",
  "Anonymous tip sent to a HR recipient in Denver",
  "34 PDF files just merged in 1.4 seconds",
  "An NDA template was downloaded from Chicago",
  "HEIC image converted to JPG for free",
  "Someone successfully removed their data from a public registry",
  "Lease agreement generated and downloaded",
  "Independent contractor agreement filled in 3 minutes",
  "Someone just saved 12MB on their PDF resumes"
];

export default function ActivityFeed() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % SEED_ACTIVITIES.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="activity-feed">
      <div className="feed-inner">
        <span className="dot"></span>
        <p className={`activity-text ${isVisible ? 'visible' : 'hidden'}`}>
          {SEED_ACTIVITIES[current]}
        </p>
      </div>

      <style jsx>{`
        .activity-feed {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
          height: 1.5rem;
          margin-bottom: 3rem;
        }

        .feed-inner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-subtle);
          padding: 0.4rem 1.25rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .activity-text {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: all 0.5s ease;
        }

        .hidden {
          opacity: 0;
          transform: translateY(5px);
        }

        .visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
    </div>
  );
}

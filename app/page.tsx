'use client';

import SmartSearch from "@/components/Home/SmartSearch";
import ActivityFeed from "@/components/Home/ActivityFeed";
import CategoryGrid from "@/components/Home/CategoryGrid";
import TrustBar from "@/components/Home/TrustBar";

export default function Home() {
  return (
    <div className="home-container">
      {/* Above the Fold */}
      <section className="hero-section container">
        <div className="hero-content">
          <h1 className="hero-title">What do you need to do today?</h1>
          <SmartSearch />
          <ActivityFeed />
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Below the Fold: Categories */}
      <div className="container">
        <CategoryGrid />
      </div>

      <style jsx>{`
        .home-container {
          padding-top: 4rem;
          padding-bottom: 6rem;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 4rem);
          margin-bottom: 2.5rem;
          color: var(--text-main);
          letter-spacing: -0.04em;
          font-weight: 800;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .home-container {
            padding-top: 2rem;
          }
          .hero-title {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

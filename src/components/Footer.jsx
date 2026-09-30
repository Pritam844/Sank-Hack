import React from 'react';
import { Heart, Sparkles, Database, ShieldCheck, ExternalLink } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Mission */}
          <div className="footer-col">
            <h4 className="footer-brand">
              Chefmate <span className="accent-2">AI</span>
            </h4>
            <p className="footer-desc">
              Every year, over 1.3 billion tons of food are wasted. Chefmate AI helps you turn lonely fridge leftovers into restaurant-quality meals with zero waste.
            </p>
            <div className="firebase-status-pill">
              <span className="status-dot" />
              <span>Firebase RTDB Cloud Connected</span>
            </div>
          </div>

          {/* Quick Kitchen Tips */}
          <div className="footer-col">
            <h5 className="col-title">Leftover Rescue Tips</h5>
            <ul className="footer-tips-list">
              <li>🥬 <strong>Herbs & Greens:</strong> Store stalks in a glass of water like cut flowers.</li>
              <li>🧅 <strong>Aromatics:</strong> Saute leftover onions & garlic into aromatic oil or stock.</li>
              <li>🧀 <strong>Cheese Rinds:</strong> Toss parmesan rinds into soups for an umami explosion.</li>
              <li>🍚 <strong>Day-old Rice:</strong> The secret to restaurant-level crispy fried rice.</li>
            </ul>
          </div>

          {/* Credits & Tech */}
          <div className="footer-col">
            <h5 className="col-title">Technology & APIs</h5>
            <div className="tech-tags">
              <span className="tech-badge">React 19</span>
              <span className="tech-badge">Vite</span>
              <span className="tech-badge">Firebase Realtime DB</span>
              <span className="tech-badge">Firebase Cloud Firestore</span>
              <span className="tech-badge">10-Min Delivery (Zepto &bull; Blinkit &bull; Instamart &bull; BigBasket &bull; Flipkart)</span>
            </div>
            <p className="attribution-text">
              Recipe intelligence powered by{' '}
              <span className="attr-link">
                Firebase Cloud Database <Database size={12} />
              </span>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copy-text">
            &copy; {new Date().getFullYear()} Chefmate AI. Crafted with{' '}
            <Heart size={14} className="heart-icon" fill="#ff5e57" color="#ff5e57" /> for food lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}

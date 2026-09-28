import React from 'react';
import { Lightbulb, Leaf, Sparkles, ChefHat, ExternalLink, ShieldCheck } from 'lucide-react';
import './RescueTips.css';

const TIPS = [
  {
    icon: '🌿',
    title: 'Coriander & Mint Freshness',
    desc: 'Never wash herbs before storing! Trim stems and stand them upright in a jar with 1 inch of water, covered with a loose bag in the fridge.'
  },
  {
    icon: '🧅',
    title: 'Onion & Garlic Magic',
    desc: 'Don’t throw half-used onions! Chop and freeze them in small silicone trays or quickly sauté with cumin to create an instant curry base.'
  },
  {
    icon: '🧀',
    title: 'Paneer Preservation',
    desc: 'Submerge leftover paneer completely in cold water inside an airtight container. Change water every 2 days to keep it soft and fresh for up to 10 days.'
  },
  {
    icon: '🍚',
    title: 'Day-Old Cooked Rice',
    desc: 'Cold refrigerated rice is the culinary gold standard for crispy fried rice or savory curd rice because starch retrogradation prevents sogginess.'
  },
  {
    icon: '🍅',
    title: 'Overripe Tomatoes',
    desc: 'Blister them in a pan with olive oil or mustard oil and garlic for a rich 5-minute pasta sauce or tomato chutney.'
  },
  {
    icon: '🍋',
    title: 'Squeezed Lemon Rinds',
    desc: 'Rub squeezed lemons on copper cookware for a mirror shine, or toss into a pitcher of cold drinking water for natural citrus infusion.'
  }
];

export default function RescueTips({ onBackToDiscover }) {
  return (
    <section className="mobile-tips-container">
      <div className="tips-hero-badge">
        <Leaf size={14} />
        <span>Zero Food Waste Guide</span>
      </div>

      <h2 className="tips-title">
        Smart Kitchen <span className="gradient-text">Rescue Tips</span>
      </h2>
      <p className="tips-subtitle">
        Save money, reduce household waste, and preserve ingredients 3x longer.
      </p>

      <div className="tips-cards-list">
        {TIPS.map((tip, idx) => (
          <div key={idx} className="tip-card glass-panel">
            <span className="tip-icon">{tip.icon}</span>
            <div className="tip-content">
              <h3 className="tip-card-title">{tip.title}</h3>
              <p className="tip-card-desc">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action to find recipes */}
      <div className="tips-action-wrap">
        <button 
          type="button" 
          className="btn-tips-discover"
          onClick={onBackToDiscover}
        >
          <Sparkles size={16} />
          <span>Rescue Leftovers in My Fridge</span>
        </button>
      </div>
    </section>
  );
}

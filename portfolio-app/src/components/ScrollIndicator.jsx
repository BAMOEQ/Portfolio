import React, { useEffect, useState } from 'react';
import '../styles/ScrollIndicator.css';

/**
 * Mouse-and-chevron scroll cue anchored at the bottom of the hero. Clicking it
 * smoothly scrolls down to the bio ("About Me") section. The cue gently bounces
 * and fades away once the visitor scrolls past the hero.
 */
function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToBio = () => {
    const target = document.getElementById('bio');
    if (!target) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <button
      type="button"
      className={`scroll-indicator${hidden ? ' is-hidden' : ''}`}
      onClick={scrollToBio}
      aria-label="Scroll to about section"
      title="Scroll to about section"
    >
      <svg
        className="scroll-indicator-icon"
        width="30"
        height="46"
        viewBox="0 0 30 46"
        fill="none"
        aria-hidden="true"
      >
        {/* Mouse body */}
        <rect
          x="1.5"
          y="1.5"
          width="27"
          height="43"
          rx="13.5"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        {/* Scroll wheel */}
        <line
          className="scroll-indicator-wheel"
          x1="15"
          y1="9"
          x2="15"
          y2="16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="scroll-indicator-chevrons"
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        aria-hidden="true"
      >
        <polyline
          points="3 3 11 9 19 3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="3 10 11 16 19 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default ScrollIndicator;

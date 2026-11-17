import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Smooth progress animation over ~1.6 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly
        const step = Math.max(2, Math.floor((100 - prev) * 0.18));
        const next = Math.min(100, prev + step);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 250);

      const unmountTimer = setTimeout(() => {
        setIsMounted(false);
        if (onFinish) onFinish();
      }, 700);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [progress, onFinish]);

  if (!isMounted) return null;

  return (
    <div className={`preloader-overlay ${isFading ? 'fade-out' : ''}`}>
      <div className="preloader-backdrop-glow" />
      <div className="preloader-card">
        {/* Decorative Badge */}
        <div className="preloader-badge">
          <Sparkles size={14} className="animate-spin-slow text-pink-600" />
          <span>Genesis Conference Network</span>
        </div>

        {/* Stackly Logo - Significantly Larger & Proportional */}
        <div className="preloader-logo-wrapper">
          <img
            src="/assets/stackly_087.webp"
            alt="Stackly Events"
            className="preloader-logo"
          />
        </div>

        {/* Progress track */}
        <div className="preloader-track-container">
          <div className="preloader-track">
            <div
              className="preloader-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="preloader-status">
            <span className="preloader-text">
              {progress < 40 && "Initializing conference catalog..."}
              {progress >= 40 && progress < 80 && "Connecting global keynotes..."}
              {progress >= 80 && "Welcome to Stackly Events"}
            </span>
            <span className="preloader-pct">{progress}%</span>
          </div>
        </div>

        {/* Subtle pulsed ring */}
        <div className="preloader-dots">
          <span className="dot dot-1" />
          <span className="dot dot-2" />
          <span className="dot dot-3" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;

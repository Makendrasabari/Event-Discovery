import React, { useEffect, useState } from 'react';

/**
 * CountUp smoothly animates a numeric stat value up to its target when triggered.
 * Preserves commas, decimals, plus signs, and percent symbols.
 */
const CountUp = ({ value, duration = 2200, isStarted = false, className = '' }) => {
  const isPercent = String(value).includes('%');
  const hasPlus = String(value).includes('+');
  const numericStr = String(value).replace(/[^0-9.]/g, '');
  const targetNum = parseFloat(numericStr) || 0;
  const decimals = numericStr.includes('.') ? numericStr.split('.')[1].length : 0;

  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (!isStarted) return;

    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Smooth cubic-out easing curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentVal(easeProgress * targetNum);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCurrentVal(targetNum);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetNum, duration, isStarted]);

  // Format value with commas, percentages, and plus signs
  let formatted = '';
  if (!isStarted) {
    formatted = '0' + (isPercent ? '%' : '') + (hasPlus ? '+' : '');
  } else if (decimals > 0) {
    formatted = currentVal.toFixed(decimals) + (isPercent ? '%' : '') + (hasPlus ? '+' : '');
  } else {
    formatted = Math.floor(currentVal).toLocaleString() + (isPercent ? '%' : '') + (hasPlus ? '+' : '');
  }

  return <span className={className}>{formatted}</span>;
};

export default CountUp;

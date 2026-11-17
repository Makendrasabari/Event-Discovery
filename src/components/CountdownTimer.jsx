import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate = "2026-12-14T09:00:00" }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="countdown-timer-container">
      <div className="countdown-unit">
        <span className="countdown-number">{pad(timeLeft.days)}</span>
        <span className="countdown-label">Days</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="countdown-number">{pad(timeLeft.hours)}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="countdown-number">{pad(timeLeft.minutes)}</span>
        <span className="countdown-label">Mins</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="countdown-number">{pad(timeLeft.seconds)}</span>
        <span className="countdown-label">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;

import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedHeading splits text and nested elements into words and characters.
 * Each character animates smoothly in from the right side one by one into place.
 */
function flattenTokens(children, globalIndex = { current: 0 }) {
  const result = [];

  React.Children.forEach(children, child => {
    if (child === null || child === undefined || child === false) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      const str = String(child);
      const rawTokens = str.split(/(\s+)/);
      rawTokens.forEach(token => {
        if (/^\s+$/.test(token)) {
          result.push({ isSpace: true });
        } else if (token.length > 0) {
          const chars = Array.from(token).map(ch => ({
            char: ch,
            index: globalIndex.current++
          }));
          result.push({ isSpace: false, chars, wrapperClassName: '' });
        }
      });
    } else if (React.isValidElement(child)) {
      const childClassName = child.props.className || '';
      const nested = flattenTokens(child.props.children, globalIndex);
      nested.forEach(item => {
        if (!item.isSpace) {
          result.push({
            ...item,
            wrapperClassName: childClassName ? `${childClassName} ${item.wrapperClassName || ''}`.trim() : item.wrapperClassName
          });
        } else {
          result.push(item);
        }
      });
    }
  });

  return result;
}

const AnimatedHeading = ({ as = 'h2', className = '', children, style = {}, delay = 0, ...rest }) => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    // Safety timer ensures the heading is always clearly visible even if observer fails or on slow devices
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          clearTimeout(safetyTimer);
        }
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  const tokens = flattenTokens(children);
  const Component = as;

  return (
    <Component
      ref={headingRef}
      className={`animated-heading ${isVisible ? 'is-visible' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {tokens.map((token, idx) => {
        if (token.isSpace) {
          return ' ';
        }
        return (
          <span 
            key={idx} 
            className={`animated-word ${token.wrapperClassName || ''}`}
          >
            {token.chars.map((c, cIdx) => (
              <span
                key={cIdx}
                className="animated-letter"
                style={{
                  animationDelay: isVisible ? `${delay + (c.index * 22)}ms` : '0ms'
                }}
              >
                {c.char}
              </span>
            ))}
          </span>
        );
      })}
    </Component>
  );
};

export default AnimatedHeading;

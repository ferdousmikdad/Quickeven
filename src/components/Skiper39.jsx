import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

const Skiper39 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Your GSAP animations for Skiper39 component
    if (containerRef.current) {
      // Example animation
      gsap.fromTo(
        containerRef.current,
        {
          scale: 0,
          rotation: 0
        },
        {
          scale: 1,
          rotation: 360,
          duration: 1.5,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="skiper-39"
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#3b82f6',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold'
      }}
    >
      Skiper39
    </div>
  );
};

export default Skiper39;
import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/knob.module.scss';

const Knob = () => {
  const [knobValue, setKnobValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<any>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (event:any) => {
    if (isDragging) {
      const knobRect = knobRef.current.getBoundingClientRect();
      const centerX = knobRect.left + knobRect.width / 2;
      const centerY = knobRect.top + knobRect.height / 2;
      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
      const degrees = (angle * 180) / Math.PI;

      // 각도를 0부터 360으로 변환하고 0부터 100으로 정규화
      let newValue = ((degrees + 360) % 360) / 360 * 100;
      setKnobValue(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div>
      <label htmlFor="knob">Knob</label>
      <input
        type="range"
        id="knob"
        name="knob"
        min="0"
        max="100"
        value={knobValue}
        onChange={(event:any) => setKnobValue(event.target.value)}
      />
      <div
        ref={knobRef}
        className={styles.knob_container}
        onMouseDown={handleMouseDown}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          transform: `rotate(${knobValue * 3.6}deg)`
        }}
      >
        <div className={styles.knob}></div>
      </div>
      <p>Current Value: {knobValue}</p>
    </div>
  );
};

export default Knob;
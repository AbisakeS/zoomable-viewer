import React, { useRef, useState } from 'react';
import './ZoomableContainer.scss';

const ZoomableContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const newScale = e.deltaY < 0 ? scale + zoomFactor : scale - zoomFactor;
    setScale(Math.min(Math.max(newScale, 1), 3));
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 1));
  const resetZoom = () => setScale(1);

  return (
    <div className="main-wrapper">
      <div className="controls">
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>−</button>
        <button onClick={resetZoom}>Reset</button>
      </div>
      <div
        ref={containerRef}
        className="zoom-container"
        onWheel={handleWheel}
      >
        <div
          className="zoom-content-simple"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="card">
            <h1>Zoomable UI</h1>
            <p>Use your mouse wheel or buttons to zoom in and out easily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomableContainer;
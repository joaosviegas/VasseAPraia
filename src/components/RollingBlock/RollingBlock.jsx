import React from "react";
import './RollingBlock.css';

const RollingBlock = ({ data }) => {
  return (
    <div className="rolling-block">

      <div className="rolling-block-header">
        <div className="rolling-tag">Com a Presença de:</div>
      </div>

      <div className="slider">
        <div className="slide-track">
          {data.map((item, index) => (
            <div className="slide" key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={item.imageUrl} alt={item.altText || ''} />
              </a>
            </div>
          ))}
          {data.slice(0, 8).map((item, index) => (
            <div className="slide" key={`repeat-${index}`}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={item.imageUrl} alt={item.name || ''} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RollingBlock;
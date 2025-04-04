import React from "react";
import './RollingBlock.css';

const RollingBlock = ({ data }) => {
  return (
    <div className="slider">
      <div className="slide-track">
        {data.map((item, index) => (
          <div className="slide" key={index}>
            <img src={item.imageUrl} alt={item.name || ''} />
          </div>
        ))}
        {data.slice(0, 7).map((item, index) => (
          <div className="slide" key={`repeat-${index}`}>
            <img src={item.imageUrl} alt={item.name || ''} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingBlock;
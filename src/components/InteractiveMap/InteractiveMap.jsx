import React, { useState, useEffect } from 'react';
import './InteractiveMap.css';
import MadeiraSvg from './Madeira.svg';
import MadeiraConcelhosSvg from './Madeira-Concelhos.svg';

const InteractiveMap = ({onConcelhoSelect, selectedConcelho}) => {
  const [activeRegion, setActiveRegion] = useState(null);
  const [clickedRegion, setClickedRegion] = useState(null);
  
  useEffect(() => {
    if (selectedConcelho) {
      const region = regions.find(r => r.name === selectedConcelho);
      if (region) {
        setClickedRegion(region);
        setActiveRegion(region);
      }
    }
  }, [selectedConcelho]);

  const regions = [
    {
        id: "funchal",
        name: "Funchal",
        beaches: 14,
        description: "Capital da Madeira e zona turística",
        path: "M388.999 362L398.499 364C398.999 359.667 400.499 350.2 402.499 347C403.783 344.946 404.407 344.211 404.373 343.507C404.34 342.841 403.715 342.203 402.499 340.5C400.499 337.7 396.666 333.667 394.999 332L392.999 319L388.999 306C388.832 305.333 388.499 302.5 388.499 296.5C380.499 299.7 376.499 296.667 375.499 294.75L368.499 283L360.499 271C359.666 269.5 357.599 265.9 355.999 263.5C345.599 263.9 337.666 256.667 334.999 253L331.499 256.5C321.499 258.1 313.666 270.167 310.999 276L304.999 279.5V287.5L299.999 302C300.832 304.333 302.499 309.7 302.499 312.5C307.899 314.1 308.082 320.167 307.499 323L304.999 330.5H302.499L295.749 359.5L307.499 360.5L316.999 370L339.999 371.5C341.832 369 346.599 363.6 350.999 362C354.599 364.8 372.499 360.833 380.999 358.5L388.999 362Z",
        tooltipPosition: { x: 550, y: 330 },
        isLeft: false
    },
    {
        id: "camara de lobos",
        name: "Câmara de Lobos",
        beaches: 3,
        description: "Vinhas e paisagens típicas",
        path: "M271.999 351L283.999 358.5L295.749 359.5L302.499 330.5H304.999L307.499 323C308.082 320.167 307.899 314.1 302.499 312.5C302.499 309.7 300.832 304.333 299.999 302L304.999 287.5V279.5L310.999 276C313.666 270.167 321.499 258.1 331.499 256.5L334.999 253C336.599 250.2 333.332 248.833 331.499 248.5C327.166 247.333 319.999 244.2 325.999 241C332.461 237.553 327.416 233.364 323.017 229.712L323.016 229.712L323.011 229.707C322.307 229.123 321.62 228.552 320.999 228C326.999 224.4 323.499 222.167 320.999 221.5H306.999L280.499 229.5L281.999 238.5L277.999 251.5L280.499 260.5L274.999 266L273.499 273.5L267.999 281.5C265.832 283.507 261.499 289.316 261.499 296.5C264.299 306.1 256.332 315.5 251.999 319V328.5L236.499 330.5L231.999 340.576L241.499 344L247.499 351H271.999Z",
        tooltipPosition: { x: 40, y: 330 },
        isLeft: true
    },
    {
        id: "ribeira brava",
        name: "Ribeira Brava",
        beaches: 3,
        description: "Praia de Calhau e Paisagens Naturais",
        path: "M186.999 319L198.499 328.5L231.999 340.576L236.499 330.5L251.999 328.5V319C256.332 315.5 264.299 306.1 261.499 296.5C261.499 289.316 265.832 283.507 267.999 281.5L273.499 273.5L274.999 266L280.499 260.5L277.999 251.5L281.999 238.5L280.499 229.5C276.332 227.667 265.999 224.8 257.999 228C249.999 231.2 245.999 227.333 244.999 225C242.832 224.167 238.099 223.6 236.499 228C234.899 232.4 230.832 232.5 228.999 232L222.999 235.5H216.999L183.499 296.5L175.999 319H186.999Z",
        tooltipPosition: { x: -20, y: 330 },
        isLeft: true
    },
    {
        id: "ponta do sol",
        name: "Ponta do Sol",
        beaches: 5,
        description: "Praias de Calhau e Acessos ao Mar",
        path: "M160.499 316.5L164.999 319H175.999L183.499 296.5L216.999 235.5C216.166 231.5 209.499 220.8 189.499 210L168.499 222.5L151.499 236.5L146.499 251.5L130.499 267.5C128.166 273.5 123.399 285.904 122.999 287.52C134.378 295.728 146.25 308.717 152.499 316.5H160.499Z",
        tooltipPosition: { x: -50, y: 250 },
        isLeft: true
    },
    {
        id: "calheta",
        name: "Calheta",
        beaches: 5,
        description: "Praia de Areia, Acessos ao Mar, bom tempo e natureza",
        path: "M19.4989 136.5L0.998901 156.5V167C16.5989 170.6 18.4989 190.5 17.4989 200L21.9989 212L33.4989 222.5C43.3322 237.333 64.8989 266.6 72.4989 265C81.9989 263 97.999 274 106.499 280C111.291 280.274 117.078 283.25 122.999 287.52C123.399 285.904 128.166 273.5 130.499 267.5L146.499 251.5L151.499 236.5L168.499 222.5L189.499 210C189.499 208.537 189.004 206.475 188.315 204.33C188.28 204.22 188.244 204.11 188.208 204L170.999 206.5C163.166 208.667 145.599 211.7 137.999 206.5H127.999L120.499 200V196L109.999 171.5C111.999 168 113.299 160.5 102.499 158.5C99.699 158.5 96.999 161.5 95.999 163C93.6657 163.167 87.499 162.5 81.499 158.5H72.9989L39.4989 119.136L31.4989 123.5L27.4989 130L19.4989 136.5Z",
        tooltipPosition: { x: -30, y: 50 },
        isLeft: true
    },
    {
        id: "porto moniz",
        name: "Porto Moniz",
        beaches: 7,
        description: "Piscinas Naturais e natureza",
        path: "M47.4989 107.5L42.4989 117.5L39.4989 119.136L72.9989 158.5H81.499C87.499 162.5 93.6657 163.167 95.999 163C96.999 161.5 99.699 158.5 102.499 158.5C113.299 160.5 111.999 168 109.999 171.5L120.499 196V200L127.999 206.5H137.999C145.599 211.7 163.166 208.667 170.999 206.5L188.208 204C187.21 200.964 185.858 197.814 184.999 196L195.999 174.5V166L203.499 152.675L197.999 153.5L178.499 147.5L170.999 146L165.999 134.5H140.999L137.999 130L114.999 102.5L97.499 85H65.9989L61.4989 87L57.4989 98.5L47.4989 107.5Z",
        tooltipPosition: { x: 220, y: 50 },
        isLeft: false
    },
    {
        id: "sao vicente",
        name: "São Vicente",
        beaches: 3,
        description: "Praias de Calhau, Areia Negra e Natureza",
        path: "M229.999 150.5H217.999L203.499 152.675L195.999 166V174.5L184.999 196C185.858 197.814 187.21 200.964 188.208 204C188.244 204.11 188.28 204.22 188.315 204.33C189.004 206.475 189.499 208.537 189.499 210C209.499 220.8 216.166 231.5 216.999 235.5H222.999L228.999 232C230.832 232.5 234.899 232.4 236.499 228C238.099 223.6 242.832 224.167 244.999 225C245.999 227.333 249.999 231.2 257.999 228C265.999 224.8 276.332 227.667 280.499 229.5L306.999 221.5C309.999 219 314.999 212.7 310.999 207.5C301.799 203.9 308.832 192.667 313.499 187.5V155.5L295.499 132L274.999 133L265.499 141.5L243.499 146L229.999 150.5Z",
        tooltipPosition: { x: 370, y: 70 },
        isLeft: false
    },
    {
        id: "santana",
        name: "Santana",
        beaches: 4,
        description: "Cultutra Madeirense, Casas típicas e Natureza",
        path: "M327.999 125L315.999 131L295.499 132L313.499 155.5V187.5C308.832 192.667 301.799 203.9 310.999 207.5C314.999 212.7 309.999 219 306.999 221.5H320.999C323.499 222.167 326.999 224.4 320.999 228C321.62 228.552 322.307 229.123 323.011 229.707L323.016 229.712L323.017 229.712C327.416 233.364 332.461 237.553 325.999 241C319.999 244.2 327.166 247.333 331.499 248.5C333.332 248.833 336.599 250.2 334.999 253C337.666 256.667 345.599 263.9 355.999 263.5C357.599 265.9 359.666 269.5 360.499 271C365.499 271.833 375.499 270.6 375.499 259C375.499 247.006 381.999 246.302 388.774 245.567C390.189 245.414 391.616 245.259 392.999 245C400.999 243.5 406.999 242 406.499 225.5C406.099 212.3 412.332 210 415.499 210.5C418.832 210 425.199 206.8 423.999 198C422.799 189.2 425.715 184.333 427.322 183L409.999 167.5L412.999 160.5L381.499 133C377.431 129.125 375.014 126.677 373.172 124.811C370.26 121.862 368.787 120.369 364.499 117C357.931 111.84 348.499 119.667 345.499 122.5L327.999 125Z",
        tooltipPosition: { x: 500, y: 70 },
        isLeft: false
    },
    {
        id: "machico",
        name: "Machico",
        beaches: 12,
        description: "Praias de Areia, Acessos ao Mar e história",
        path: "M474.999 204C461.799 208 451.499 204 447.999 201.5L427.322 183C425.715 184.333 422.799 189.2 423.999 198C425.199 206.8 418.832 210 415.499 210.5C412.332 210 406.099 212.3 406.499 225.5C406.999 242 400.999 243.5 392.999 245C391.616 245.259 390.189 245.414 388.774 245.567C381.999 246.302 375.499 247.006 375.499 259C375.499 270.6 365.499 271.833 360.499 271L368.499 283L388.499 272.5C392.832 272.667 402.499 270.8 406.499 262C410.499 253.2 429.999 254 436.499 262L479.999 287.5C483.666 290.333 491.999 295.75 495.999 294.75V291L514.999 262L521.499 251L529.999 248.5L539.999 242H568.999L576.499 239C579.832 242.167 587.999 249.9 593.999 255.5C612.399 259.5 611.999 252.5 609.499 248.5C603.999 246.5 592.299 241.2 589.499 236C584.299 219.2 568.332 222 560.999 225.5C555.999 225.167 541.499 222.7 523.499 215.5C502.699 215.9 492.499 212.333 489.999 210.5C487.666 210.167 481.399 208.4 474.999 204Z",
        tooltipPosition: { x: 620, y: 140 },
        isLeft: false
    },
    {
        id: "santa cruz",
        name: "Santa Cruz",
        beaches: 7,
        description: "Aeroporto, Aquapark e Praias de Calhau",
        path: "M479.999 306C483.999 306.4 492.332 301.167 495.999 298.5V294.75C491.999 295.75 483.666 290.333 479.999 287.5L436.499 262C429.999 254 410.499 253.2 406.499 262C402.499 270.8 392.832 272.667 388.499 272.5L368.499 283L375.499 294.75C376.499 296.667 380.499 299.7 388.499 296.5C388.499 302.5 388.832 305.333 388.999 306L392.999 319L394.999 332C396.666 333.667 400.499 337.7 402.499 340.5C403.715 342.203 404.34 342.841 404.373 343.507C404.407 344.211 403.783 344.946 402.499 347C400.499 350.2 398.999 359.667 398.499 364L411.499 373L436.499 362L443.999 351L462.499 335C466.666 325.167 475.999 305.6 479.999 306Z",
        tooltipPosition: { x: 600, y: 300 },
        isLeft: false
    },
    {
        id: "porto santo",
        name: "Porto Santo",
        beaches: 11,
        description: "Ilha dourada com 9km de areal",
        path: "M792 50.5C793.333 52.6667 795.9 58.7 795.5 65.5C792.7 68.3 779.833 64.3333 774.5 62L755.5 64.5L739 76.5C732.5 83.6667 717.1 98.7 707.5 101.5C690.7 98.3 691.5 83.5 694 76.5C698.5 73.8333 706.8 67.7 704 64.5C701.2 61.3 702.167 51.5 703 47C706.833 45.6667 714.5 42.2 714.5 39C714.5 35 725 35 725 31C725 27.8 738.667 19.3333 745.5 15.5C747.5 13.5 751.2 8.8 750 6C748.5 2.5 758 -0.999996 757 3C756.2 6.2 773.667 14 782.5 17.5C785.667 16.5 793.1 14.7 797.5 15.5C801.9 16.3 799.333 18.1667 797.5 19L792 28V31L795.5 44.5L792 50.5Z",
        tooltipPosition: { x:780, y: 150 },
        isLeft: false

    }
];

const handleRegionClick = (region) => {
  if (onConcelhoSelect) {
    onConcelhoSelect(region.name);
  }
  setClickedRegion(region);
}
 
return (
  <div className="map-section" id="interactive-map">
    <h2>Mapa de Praias da Madeira</h2>
    
    <div className="map-container">
      <div className="svg-container">
        <img src={MadeiraSvg} className="base-map" alt="Mapa da Madeira" />
        <img src={MadeiraConcelhosSvg} className={`concelhos-map ${activeRegion ? 'with-active' : ''}`} alt="Concelhos da Madeira" />
        
        <svg className="interactive-areas" viewBox="0 0 801 373">
          {regions.map(region => (
            <React.Fragment key={region.id}>
              <path
                d={region.path}
                className={`region-area ${activeRegion?.id === region.id ? 'active' : ''} ${clickedRegion?.id === region.id ? 'active' : ''}`}
                onMouseEnter={(e) => {
                  // Calculate the center of the Concelho dynamically
                  const bbox = e.currentTarget.getBBox();
                  const centerX = bbox.x + bbox.width / 2;
                  const centerY = bbox.y + bbox.height / 2;

                  setActiveRegion({
                    ...region,
                    centerX,
                    centerY,
                  });
                }}
                onMouseLeave={() => {
                  if (clickedRegion?.id !== region.id) {
                    setActiveRegion(null);
                  }
                }}
                onClick={() => handleRegionClick(region)}
              />

              {/* Render tooltip and connecting lines when region is active */}
              {activeRegion?.id === region.id && (
              <>
                {/* Determine line direction based on isLeft */}
                {(() => {
                  const horizontalOffset = region.isLeft ? 60 : -60; // Adjust line direction
                  const tooltipX = activeRegion.tooltipPosition.x + (region.isLeft ? -75 : -75); // Tooltip position adjustment

                  return (
                    <>
                      {/* Line: From Concelho center to a 45-degree midpoint and then horizontally */}
                      <path
                        d={`M ${activeRegion.centerX} ${activeRegion.centerY}
                          L ${activeRegion.tooltipPosition.x + horizontalOffset} ${activeRegion.tooltipPosition.y - 20}
                          L ${activeRegion.tooltipPosition.x - horizontalOffset} ${activeRegion.tooltipPosition.y - 20}`}
                        stroke="#1a73e8"
                        strokeWidth="2"
                        fill="none"
                        style={{
                          strokeDasharray: 300,
                          strokeDashoffset: 300,
                          animation: 'drawLine 0.5s ease-out forwards',
                          pointerEvents: 'none'
                        }}
                      />

                      {/* Tooltip */}
                      <foreignObject
                        x={tooltipX}
                        y={clickedRegion?.id === region.id ? clickedRegion.tooltipPosition.y - 50 : activeRegion.tooltipPosition.y - 50}
                        width="180"
                        height="100"
                      >
                        <div className="region-tooltip">
                          <div className="tooltip-content">
                            <strong>{clickedRegion?.id === region.id ? clickedRegion.name : activeRegion.name}</strong>
                            {(clickedRegion?.id === region.id ? clickedRegion.beaches : activeRegion.beaches) && (
                              <p className="tooltip-beaches">{clickedRegion?.id === region.id ? clickedRegion.beaches : activeRegion.beaches} praias nesta região</p>
                            )}
                            {(clickedRegion?.id === region.id ? clickedRegion.description : activeRegion.description) && (
                              <p className="tooltip-description">{clickedRegion?.id === region.id ? clickedRegion.description : activeRegion.description}</p>
                            )}
                          </div>
                        </div>
                      </foreignObject>
                    </>
                  );
                })()}
              </>
            )}
            </React.Fragment>
          ))}
        </svg>
      </div>
    </div>
  </div>
);
};

export default InteractiveMap;
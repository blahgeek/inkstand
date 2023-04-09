import React, { useCallback } from 'react';

declare global {
    interface Window { WIDGET: any; }
}

const Weather: React.FunctionComponent = () => {
  const kWidth = 350;
  const kHeight = 128;
  const kScale = 1.5;

  const outerContainerStyle = {
    minHeight: `${kHeight * kScale}px`,
  };

  const containerStyle = {
    width: `${kWidth}px`,
    margin: '0px auto',  // I don't understand how margin work with scaling... let's disable margin and let other elements do this
    transform: `scale(${kScale})`,  // the content in iframe is too small (the font size is fixed regardless the width)
    transformOrigin: 'top center',
  };

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }
    window.WIDGET = {
      "CONFIG": {
        "layout": "1",
        "width": `${kWidth}`,
        "height": `${kHeight}`,
        "background": "4",
        "dataColor": "000000",
        "backgroundColor": "FFFFFF",
        "language": "zh",
        "key": "b549d596fb3f4386aac590150119d5c3"
      }
    };
    const script = document.createElement('script');
    script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
    node.appendChild(script);
  }, []);
  return (
    <div className="weather" style={outerContainerStyle}>
      <div style={containerStyle} ref={containerRef}>
        <div id="he-plugin-standard" />
      </div>
    </div>
  );
};

export default Weather;


import React, { useCallback } from 'react';

declare global {
    interface Window { WIDGET: any; }
}

const Weather: React.FunctionComponent = () => {
  const width = 350;

  const containerStyle = {
    width: `${width}px`,
    margin: '50px auto',
    transform: 'scale(1.3)',
    transformOrigin: 'center',
  };

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }
    window.WIDGET = {
      "CONFIG": {
        "layout": "1",
        "width": `${width}`,
        "height": "128",
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
    <div className="weather" style={containerStyle} ref={containerRef}>
      <div id="he-plugin-standard" />
    </div>
  );
};

export default Weather;


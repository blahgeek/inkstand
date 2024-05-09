import React, { useCallback } from 'react';

const Weather: React.FunctionComponent = () => {
  const containerRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    node.appendChild(script);
  }, []);
  return (
    <div className="weather">
      <div ref={containerRef} style={{width: '100%'}}>
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/en/39d90116d41/beijing/"
          data-days="3"
          data-theme="pure" >
            Beijing, China
        </a>
      </div>
    </div>
  );
};

export default Weather;


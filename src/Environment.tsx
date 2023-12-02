import React, { useState, useEffect } from 'react';

const Environment: React.FunctionComponent = () => {
  const [t, setT] = useState('??');
  const [h, setH] = useState('??');
  const [p, setP] = useState('??');

  useEffect(() => {
    (async () => {
      const data = await (await fetch('/_environment.json')).json();
      setT(data.t.toFixed());
      setH(data.h.toFixed());
      setP(data.p.toFixed());
    })();
  }, []);

  return (
    <div className="environment">
      <h1>Indoor</h1>
      <p>{t}°C</p>
      <p>{h}% RH</p>
      <p>{p} hPa</p>
    </div>
  );
}

export default Environment;

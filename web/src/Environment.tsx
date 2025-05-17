import React, { useState, useEffect } from 'react';

const Environment: React.FunctionComponent = () => {
  const [t, setT] = useState('??');
  const [h, setH] = useState('??');
  const [p, setP] = useState('??');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get('env_t');
    const h = urlParams.get('env_h');
    const p = urlParams.get('env_p');
    if (t) setT(t);
    if (h) setH(h);
    if (p) setP(p);
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

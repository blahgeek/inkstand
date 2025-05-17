import React, {useEffect, useState} from 'react';

import Poster from './Poster';

const RandomWithSeed = function(seed: number) {
  const x = Math.cos(seed) * 10000;
  return x - Math.floor(x);
};

const Xkcd: React.FunctionComponent = () => {
  const [url, setUrl] = useState();
  const [alt, setAlt] = useState('');

  useEffect(() => {
    (async () => {
      // same as https://xkcd.com/info.0.json, but with CORS headers
      const latest = await (await fetch('https://xkcd.now.sh/?comic=latest')).json();
      const latestNum = latest.num;

      // fixed image in one day
      const daysSinceEpoch = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
      const randomNum = Math.floor(RandomWithSeed(daysSinceEpoch) * latestNum) + 1;
      const json = await (await fetch('https://xkcd.now.sh/?comic=' + randomNum)).json();
      setUrl(json.img);
      setAlt(json.alt);
    })();
  }, []);

  if (url !== undefined) {
    return <Poster url={url} text={alt} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default Xkcd;

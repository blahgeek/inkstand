import React, {useEffect, useState} from 'react';

const RandomWithSeed = function(seed: number) {
  const x = Math.cos(seed) * 10000;
  return x - Math.floor(x);
};

const FetchJsonWithCache = async function(url: string, expireSec: number = 60 * 60 * 24) {
  const cacheKey = 'fetch-cache-' + url;
  const cache = localStorage.getItem(cacheKey);
  if (cache) {
    const cacheObj = JSON.parse(cache);
    if (cacheObj.expiry > Date.now()) {
      return cacheObj.data;
    }
  }

  const data = await (await fetch(url)).json();
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data: data,
      expiry: Date.now() + expireSec * 1000,
    }));
  } catch (e) {
    console.log('failed to cache; clearing all storage', e);
    localStorage.clear();
  }
  return data;
};

const Xkcd: React.FunctionComponent = () => {
  const [url, setUrl] = useState();
  const [alt, setAlt] = useState();

  useEffect(() => {
    (async () => {
      // same as https://xkcd.com/info.0.json, but with CORS headers
      const latest = await FetchJsonWithCache('https://xkcd.now.sh/?comic=latest');
      const latestNum = latest.num;

      // fixed image in one day
      const daysSinceEpoch = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
      const randomNum = Math.floor(RandomWithSeed(daysSinceEpoch) * latestNum) + 1;
      const json = await FetchJsonWithCache('https://xkcd.now.sh/?comic=' + randomNum);
      setUrl(json.img);
      setAlt(json.alt);
    })();
  }, []);

  const style = {
    backgroundImage: 'url(' + url + ')',
  };
  return (
  <>
    <div className="xkcd" style={style}></div>
    <div className="xkcd-alt">{alt}</div>
  </>
  );
};

export default Xkcd;

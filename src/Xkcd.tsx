import React, {useEffect} from 'react';


const RandomWithSeed = function(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const Xkcd: React.FunctionComponent = () => {
  const [url, setUrl] = React.useState();

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
    })();
  }, []);

  const style = {
    backgroundImage: 'url(' + url + ')',
  };
  return (
    <div className="xkcd" style={style}></div>
  );
};

export default Xkcd;

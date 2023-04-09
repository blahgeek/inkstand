import React, {useEffect} from 'react';

const Xkcd: React.FunctionComponent = () => {
  const [url, setUrl] = React.useState();

  useEffect(() => {
    (async () => {
      const latest = await (await fetch('https://xkcd.now.sh/?comic=latest')).json();
      const latestNum = latest.num;
      const randomNum = Math.floor(Math.random() * latestNum) + 1;
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

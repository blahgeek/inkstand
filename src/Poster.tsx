import React from 'react';

type PosterProps = {
  url: string;
  text?: string;
};

const Poster: React.FunctionComponent<PosterProps> = ({ url, text }) => {
  const style = {
    backgroundImage: 'url(' + url + ')',
  };
  return (
  <>
    <div className="poster" style={style}></div>
    <div className="poster-text">{text || ''}</div>
  </>
  );
};

export default Poster;

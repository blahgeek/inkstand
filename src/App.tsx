import React from 'react';
import moment from 'moment';

import Weather from './Weather';
import Environment from './Environment';
import DateTime from './DateTime';
import Xkcd from './Xkcd';
import Poster from './Poster';

const kSpecialPosters: Record<string, string> = {
  '0507': '/images/happy_birthday.jpg',
  '0510': '/images/anniversary.png',
  '0621': '/images/anniversary.png',
};

function App() {
  const date = moment().format('MMDD');

  return (
    <div className="App">
      <div className="datetime-weather-container">
        <DateTime />
        <Environment />
      </div>
      <Weather />
      { (kSpecialPosters[date] && <Poster url={kSpecialPosters[date]} />) || <Xkcd /> }
    </div>
  );
}

export default App;

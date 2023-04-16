import React from 'react';
import moment from 'moment';

import Weather from './Weather';
import DateTime from './DateTime';
import Xkcd from './Xkcd';
import Poster from './Poster';

const kSpecialPosters: Record<string, string> = {
  '0507': '/images/happy_birthday.jpg',
};

function App() {
  const date = moment().format('MMDD');

  return (
    <div className="App">
      <DateTime />
      <Weather />
      { kSpecialPosters[date] && <Poster url={kSpecialPosters[date]} /> || <Xkcd /> }
    </div>
  );
}

export default App;

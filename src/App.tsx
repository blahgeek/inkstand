import React from 'react';

import Weather from './Weather';
import DateTime from './DateTime';
import Xkcd from './Xkcd';

function App() {
  return (
    <div className="App">
      <DateTime />
      <Weather />
      <Xkcd />
    </div>
  );
}

export default App;

import React from 'react';
import moment from 'moment';

const DateTime: React.FunctionComponent = () => {
  // date like "Friday, Feb 2"
  const date_str = moment().format('dddd, MMM D');

  // time like "20:30"
  const time_str = moment().format('HH:mm');

  return (
    <div>
      <h2 className="date">{ date_str }</h2>
      <h1 className="time">{ time_str }</h1>
    </div>
  )
};

export default DateTime;

import React from 'react';
import moment from 'moment';

const DateTime: React.FunctionComponent = () => {
  const now = moment().utcOffset(8);

  // date like "Friday, Feb 2"
  const date_str = now.format('dddd, MMM D');

  // time like "20:30"
  const time_str = now.format('HH:mm');

  return (
    <div className="datetime">
      <h2 className="date">{ date_str }</h2>
      <h1 className="time">{ time_str }</h1>
    </div>
  )
};

export default DateTime;

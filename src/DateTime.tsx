import React from 'react';

const DateTime: React.FunctionComponent = () => {
  // date like "Feb 2, Friday"
  const date_str = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  });

  // time like "20:30"
  const time_str = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div>
      <h2 className="date">{ date_str }</h2>
      <h1 className="time">{ time_str }</h1>
    </div>
  )
};

export default DateTime;

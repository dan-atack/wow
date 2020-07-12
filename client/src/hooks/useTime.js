import React from 'react';

// useTime hook: use to trigger frequent re-renders. Copied and slightly condensed from James Fulford's code at
// https://medium.com/javascript-in-plain-english/usetime-react-hook-f57979338de

const getTime = () => {
  return new Date();
};

export const useTime = (refreshInterval = 100) => {
  const [now, setNow] = React.useState(getTime());
  React.useEffect(() => {
    const intervalId = setInterval(() => setNow(getTime()), refreshInterval);
    return () => clearInterval(intervalId);
  }, [refreshInterval, setInterval, clearInterval, setNow, getTime]);
  return now;
};

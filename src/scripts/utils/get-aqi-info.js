const getAqiInfo = (aqi, outputArrayValues) => {
  const thresholds = {
    index: [50, 100, 150, 200, 300, 500],
  };

  if (aqi !== '-') {
    for (let i = 0; i < thresholds.index.length; i++) {
      if (aqi <= thresholds.index[i]) {
        return outputArrayValues[i];
      }
    }

    return outputArrayValues[thresholds.index.length];
  }

  return outputArrayValues[thresholds.index.length];
};

export default getAqiInfo;

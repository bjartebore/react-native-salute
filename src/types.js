const types = {
  NO_STYLE: 'nostyle',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
};

export const typeFromString = (str) => {
  const foundType = Object.entries(types)
    .find(([key, value]) => value.toLowerCase() === str.toLowerCase());

  return (foundType) ? foundType[1] : types.INFO;
};

export default types;

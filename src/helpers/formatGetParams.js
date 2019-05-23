export const formatQuery = (params) => {
  const keys = Object.keys(params);
  // Object.values(params);
  const arr1 = keys.map((item ,index) => {
    if (index === 0) {
      return `?${item}=${params[item]}`;
    } else {
      return `&${item}=${params[item]}`;
    }
  });
  return arr1.join('');
}
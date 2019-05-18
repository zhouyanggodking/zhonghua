export const dateFormat = (date) => {
  if (date.length === 10) {
    return `${date} 00:00:00`;
  }
  return date;
}
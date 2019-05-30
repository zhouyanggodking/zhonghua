export const dateFormat = (date) => {
  if (date && date.length === 10) {
    return `${date} 00:00:00`;
  }
  return date;
}
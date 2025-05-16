export const formatAge = (birthYear) => {
  const currentYear = new Date().getFullYear();
  return `${currentYear - birthYear} years old`;
};

export const formatHour = (hourString) => {
  if (!hourString) return '';
  const [hour, minute] = hourString.split(':');
  const h = parseInt(hour, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  const formattedHour = h % 12 === 0 ? 12 : h % 12;
  return `${formattedHour}:${minute} ${period}`;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


export const formatDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};


export default function getDate(date) {
  // Convert the date string to the locale string and output it as a string
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dt = new Date(date).toLocaleString();
  const month = months[new Date(dt).getMonth()];
  const day = new Date(dt).getDate();
  const year = new Date(dt).getFullYear();
  const hr = new Date(dt).getHours();
  const ampm = hr >= 12 ? "PM" : "AM";
  const min = new Date(dt).getMinutes();
  const minutes = min >= 10 ? min : "0" + min;
  const hour =
    ampm === "PM" && hr % 12 === 0
      ? 12
      : ampm === "AM" && hr % 12 === 0
      ? "00"
      : hr % 12;

  const fullDate = {
    month,
    day,
    year,
    hour,
    minutes,
    ampm,
  };
  // Return the date as a string
  // use the following for time output in the return ${fullDate.hour + ":" + fullDate.minutes} ${fullDate.ampm}
  return `${fullDate.day} ${fullDate.month} ${fullDate.year}`;
}

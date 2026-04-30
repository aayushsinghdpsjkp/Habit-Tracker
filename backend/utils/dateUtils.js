// Get today's date as string (YYYY-MM-DD) in local timezone
const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get yesterday's date as string (YYYY-MM-DD) in local timezone
const getYesterdayString = () => {
  const yesterday = new Date(Date.now() - 86400000);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Check if a date string is today
const isToday = (dateString) => {
  return dateString === getTodayString();
};

// Check if a date string is yesterday
const isYesterday = (dateString) => {
  return dateString === getYesterdayString();
};

module.exports = {
  getTodayString,
  getYesterdayString,
  isToday,
  isYesterday
};

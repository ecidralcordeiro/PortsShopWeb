const DateFmt = (date) => {
  let day = date.substring(0, 4);

  let month = date.substring(4, 6);

  let year = date.substring(6, 8);

  let fmtDate = `${day}/${month}/${year}`;

  return fmtDate;
};

//entrada e saida
//  2021-11-24T04:39:23.35
//2021/11/24 - 04:39
const DateTimeFmt = (date) => {

  if (date === null) {
    return "";
  }
  let day = date.substring(8, 10);
  let month = date.substring(5, 7);
  let year = date.substring(0, 4);

  let hours = date.substring(11, 13);
  let minus = date.substring(14, 16);

  let fmtDate = `${day}/${month}/${year} - ${hours}:${minus} `;

  return fmtDate;
};

const fmt0left = (date, number) => {
  let newDate = date.toString();

  while (newDate.length !== number) {
    newDate = "0" + newDate;
  }

  return newDate;
};

const fmtDate0left = (date) => {
  let newDate = date.toString();

  if (newDate.length === 1) {
    newDate = "0" + newDate;
  }

  return newDate;
};
const remove0fromLeft = (str) => {
  while (str.startsWith("0")) {
    str = str.substr(1);
  }
  return str;
};

const TimeFmt = (time) => {
  let hours = Add0Left(time / 60);

  let minutes = Add0Left(time % 60);

  hours = Math.trunc(hours);

  let fmtTime = `${hours}:${minutes}`;

  return fmtTime;
};

const Add0Left = (data) => {
  data = data.toString();

  if (data.length < 2) {
    data = "0" + data;
  }

  return data;
};

const GetDateNow = () => {
  const date = new Date();

  let day = Add0Left(date.getDate());

  let month = Add0Left(date.getMonth() + 1);

  let year = date.getFullYear();

  let currentDate = `${year}${month}${day}`;

  return currentDate;
};

const GetTimeNow = () => {
  const date = new Date();

  let hours = date.getHours();

  let minutes = date.getMinutes();

  let time = hours * 60 + minutes;

  return time;
};

const getTimeFromDateTime = (dateTime) => {
  var time = null;
  if (dateTime !== null) {
    time = dateTime.slice(11, 16);
  }
  return time;
};
const getDateFromDateTime = (dateTime) => {
  var time = null;
  if (dateTime !== null) {
    time = dateTime.slice(0, 10);
    time = time.replace("-", "/");
    time = time.replace("-", "/");
  }
  return time;
};

export {
  DateFmt,
  DateTimeFmt,
  TimeFmt,
  fmt0left,
  Add0Left,
  GetDateNow,
  GetTimeNow,
  fmtDate0left,
  getTimeFromDateTime,
  getDateFromDateTime,
  remove0fromLeft
};

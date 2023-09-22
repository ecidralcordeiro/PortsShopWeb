var user = "";
var password = "";
var token = "";

const getToken = () => token;
const setToken = (value) => (token = value);
const setUserGlobal = (value) => (user = value);
const setPasswordGlobal = (value) => (password = value);

export {
  setToken,
  getToken,
  user,
  password,
  token,
  setUserGlobal,
  setPasswordGlobal,
};

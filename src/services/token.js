import blogFetch from "../axios/config.js";
import { user, password } from "../constantes.js";
import { setToken } from "../constantes.js";
import { getCookie, setCookie } from "../section/cookie.js";

const getToken = async () => {
  try {
    const userData = {
      email: user,
      password: password
    };

    const response = await blogFetch.post("/token", userData);
    let token = response.data.token;  

    setCookie("token", token, 7); 
    setCookie("login", true, 7);
    
    console.log("token: " + token )
    return token
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default  getToken;


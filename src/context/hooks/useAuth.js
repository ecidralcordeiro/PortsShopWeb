import { useState, useEffect } from "react";
import blogFetch from "../../axios/config";
import getToken from "../../services/token";
import { setCookie, getCookie, removeCookie } from "../../section/cookie";

export default function useAuth() {

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      console.log("token: " + token)
      blogFetch.defaults.headers.Authorization = `Bearer ${token}`;
      setCookie("login",true,1);
    }
  }, []);

  async function handleLogin() {
    const token = await getToken();
    console.log("Valor do token armazenado no cookie é:", token);

    if (token == null) {
      setCookie("login",false,1);
      blogFetch.defaults.headers.Authorization = undefined;
      return false;
    }
    blogFetch.defaults.headers.Authorization = `Bearer ${token}`;
    setCookie("login",true,1);
    return true;
  }

  async function handleLogout() {
    removeCookie("login");
    removeCookie("token");
    blogFetch.defaults.headers.Authorization = undefined;
    window.location.reload(true);

  }

  return {handleLogin, handleLogout };
}

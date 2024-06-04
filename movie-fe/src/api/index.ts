import axios from "axios";

// http://localhost:8080
export const server = axios.create({
  baseURL: "https://movie-collection-production.up.railway.app",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthToken = () => {
  const token = localStorage.getItem("token") || "";
  setAuthToken(token);
  return token;
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
  if (token && token !== "undefined") {
    console.log("set token", token);
    server.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    server.defaults.headers.common["Authorization"] = "";
  }
};

getAuthToken();

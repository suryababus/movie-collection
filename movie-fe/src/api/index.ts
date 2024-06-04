import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = () => {
  const token = localStorage.getItem("token") || "";
  setAuthToken(token);
  return token;
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
  if (token && token !== "undefined") {
    console.log("set token", token);
    server.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
};

getAuthToken();

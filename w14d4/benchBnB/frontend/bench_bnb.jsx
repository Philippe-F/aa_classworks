import React from "react";
import ReactDOM from "react-dom";
import { signUp, login, logout } from "./utils/session_api_utl";

document.addEventListener("DOMContentLoaded", () => {
  window.signup = signUp;
  window.login = login;
  window.logout = logout; 
  const root = document.getElementById("root");
  ReactDOM.render(<h1>Welcome to BenchBnB</h1>, root);
});
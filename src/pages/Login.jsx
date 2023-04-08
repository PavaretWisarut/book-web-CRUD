import React from "react";
import { Link } from "react-router-dom";
import "../login.css";
function Login() {
  return (
    <>
      <form>
        <div className="box">
          <h1>Login Page</h1>

          <input
            type="text"


            placeholder="username"
            className="email"
          />

          <input
            type="password"

            placeholder="password"
            className="email"
          />

          <a href="#">
            <Link id="btn2" to="/home">Login</Link>
          </a>
        </div>
      </form>
    </>
  );
}

export default Login;

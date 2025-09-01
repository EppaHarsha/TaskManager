import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://taskmanager-70vx.onrender.com/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const success = response.data.success;
      const userData = response.data.userData;
      console.log(userData);
      if (success) {
        localStorage.setItem("token", userData.token);
        const getUser = localStorage.getItem("username");
        console.log(userData.token);
        localStorage.setItem("username", userData.username);
        toast.success(response.data.message);
        navigate("/home");
      }
      if (!success) {
        toast.error(response.data.message, { position: "top-right" });
      }
    } catch (err) {
      toast.error(`somethimg went wrong${err.message}`, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <h1 className="text-muted"> Welcome back</h1>
            <h5 className="text-muted mt-4">Log in to access your tasks.</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <form action="">
              <div className="mt-4">
                <label className="form-label mb-2">UserName</label>
                <input
                  type="text"
                  placeholder="Enter your UserName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mt-2 mb-4">
                <label className="form-label mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{ fontSize: "17px" }}
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="mt-2">
              If you don't have account go to &nbsp;
              <Link to="/signup" style={{ fontSize: "18px" }}>
                signup
              </Link>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="col-5">
            <img
              src="/images/Login.svg"
              alt="Login"
              style={{ height: "80%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;

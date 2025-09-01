import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://taskmanager-70vx.onrender.com/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.userData.token);
        localStorage.setItem("username", response.data.userData.username);
        navigate("/home");
      } else {
        toast.info(response.data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(`something went wrong ${err}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <h1 className="text-muted">New here?</h1>
            <h5 className="text-muted mt-4">
              Create your account to start managing your tasks easily
            </h5>
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
              <div className="mt-2">
                <label className="form-label mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                SignUp
              </button>
            </form>
            <div className="mt-2">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="col-5">
            <img
              src="/images/singup1.svg"
              alt="signup"
              style={{ height: "80%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;

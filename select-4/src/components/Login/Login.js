import React, { useState } from "react";
import axios from "axios";

const Authenticate = () => {
  const [NewUsername, setNewUsername] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  const [LoginUsername, setLoginUsername] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  const Signup = async (e) => {
    e.preventDefault();
    if (NewUsername && NewPassword) {
      // Send a POST request to the API endpoint
      const response = await axios.post("/api/user", {
        NewUsername,
        NewPassword,
      });
      if (response.status == 200) {
        // If successful, redirect the browser to the Wallet page
        document.location.replace("/#/wallet");
      } else {
        alert(response.statusText); // TODO: Make this more user-friendly
      }
    }
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    if (LoginUsername && LoginPassword) {
      // Send a POST request to the API endpoint
      const response = await axios.post("/api/user/login", {
        LoginUsername,
        LoginPassword,
      });
      if (response.status == 200) {
        // If successful, redirect the browser to the Wallet page
        document.location.replace("/#/wallet");
      } else {
        alert(response.statusText); // TODO: Make this more user-friendly
      }
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-around'>
        <div className="col-md-4 my-5">
          <form className="form login-form">
            <h2 className="text-light">Login</h2>
            <label className="text-light">username:</label>
            <input className="form-control" type="text" placeholder="Username" name="loginUsername"
              onChange={(e) => {setLoginUsername(e.target.value);}}
            />
            <label className="text-light">password:</label>
            <input className="form-control" type="password" placeholder="Password" name="loginPassword"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className="btn btn-success mt-3" onClick={LoginUser} type="submit">login</button>
          </form>
        </div>

        <div className="col-md-4 my-5">
          <form className="form signup-form">
            <h2 className="text-light">Signup</h2>
            <label className="text-light">username:</label>
            <input className="form-control" type="text" placeholder="Username" name="newUsername"
                onChange={(e) => setNewUsername(e.target.value)}
            />
            <label className="text-light">password:</label>
            <input className="form-control" type="password" placeholder="Password" name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={(e) => {Signup(e);}} type="submit">signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;

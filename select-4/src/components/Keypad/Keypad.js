import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./keypad.css";

const Keypad = (props) => {
  const [clickedNumber, setClickedNumber] = useState("");
  const [loggedInUser, setLoggedInUser] = useState('');

  // Get user session
  useEffect(() => {
    // console.log('In useEffect. Logged in as: ', loggedInUser);
    API.getSession()
    .then((res) => setLoggedInUser(res.data.user_id))
    .catch((err) => console.log(err));
  });

  const clickButton = (event) => {
    // console.log(event.target.textContent);
    let number = event.target.textContent;
    let newNumber = clickedNumber + number;
    if (newNumber.length <= 4) {
      setClickedNumber(newNumber);
      //   props.pickNumber(newNumber);
      //   setClickedNumber("");
    }
    // else {  }
  };

  const clear = () => {
    setClickedNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // use POST route to send the ticket to the database using logged in user and today's date
    // Only call API route if ticket is exactly 4 digits
    //console.log('Ticket bought: ', clickedNumber);
    if (clickedNumber.length === 4) {
      //console.log('Calling the POST route!');
      API.createTicket({
        number: clickedNumber,
        date: new Date().toDateString(),
        user_id: loggedInUser
      }).catch((err) => console.log(err));
      setClickedNumber("");
    }
  };
  const handleChange = (e) => {
    //console.log(e.target.value);
  };

  return (
    <div className="backGround" style={{ height: "100vh" }}>
      <div className="container py-4" style={{ color: "red", fontSize: "100px" }}>
        <h1 className="text-light">Choose your 4-digit ticket</h1>
        <form onSubmit={handleSubmit}>
          <input style={{backgroundColor: "#b2bec3", borderWidth: "5px", borderStyle: "double", borderColor: "white",
            width: "288px", height: "100px", textAlign: "center"}} type="text" name="ticket" onChange={handleChange} value={clickedNumber}
          />
        </form>
        <div className="row">
          <div className="col-auto mx-auto bg-white rounded shadow">
            <div className="btn-group-vertical mx-2 my-3" role="group">
              <div className="btn-group btn-group-lg">
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary border-bottom-0 rounded-0">1</button>
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary border-bottom-0">2</button>
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary border-bottom-0 rounded-0">3</button>
              </div>
              <div className="btn-group btn-group-lg">
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary border-bottom-0 rounded-0">4</button>
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary border-bottom-0">5</button>
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary border-bottom-0 rounded-0">6</button>
              </div>
              <div className="btn-group btn-group-lg">
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary rounded-0">7</button>
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary">8</button>
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary rounded-0">9</button>
              </div>
              <div className="btn-group btn-group-lg">
                <button type="button" onClick={clear} className="btn btn-outline-secondary">X</button>
                <button type="button" onClick={clickButton} className="btn btn-outline-secondary">0</button>
                <button type="button" onClick={handleSubmit} className="btn btn-outline-secondary">{">"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keypad;
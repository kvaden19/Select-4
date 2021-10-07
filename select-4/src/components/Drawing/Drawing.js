import React, { useState, useEffect } from "react";
import "./drawing.css";
import Header3 from "../../images/Header3.png";
import API from "../../utils/API.js";

const Drawing = (props) => {

  // COUNTDOWN AND DRAWING FUNCTIONALITY
  // Calculate time left
  const calculateTimeLeft = () => {
    let drawTime = new Date().setSeconds(30);
    const difference = +drawTime - +new Date(); // in milliseconds

    let timeLeft = {};

    if (difference >= 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  // Winning Number Draw
  function drawWinner() {
    let string;
    let winningNumber = Math.floor(Math.random() * 10000);

    // Make sure any leading zeros show up in the winning number
    if (winningNumber === 0) {
      string = "0000";
    } else if (winningNumber < 10) {
      string = "000" + String(winningNumber);
    } else if (winningNumber < 100) {
      string = "00" + String(winningNumber);
    } else if (winningNumber < 1000) {
      string = "0" + String(winningNumber);
    } else {
      string = String(winningNumber);
    }

    let winningString = string;
    return winningString;
  }

  // Parses winning number into a list of strings for display purposes
  function displayWinner(ticket) {
    let display;
    display = ticket.split('');
    return display;
  }

  // State hooks
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [winningString, setWinningString] = useState(drawWinner());  // Does this need to be state variable?
  const [displayTicket, setDisplayTicket] = useState(['?', '?', '?', '?']);
  
  // Set up timer components for display
  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    // "Prod" mode - 
    // timerComponents.push(<span>{timeLeft[interval]} {interval}{" "}</span>);

    // Demo mode - every 30 seconds, no labelled intervals needed
    timerComponents.push(<span>{timeLeft[interval]}</span>);
  });

  // Effect hook for updating counter every second. Draws new winner when timer hits zero.
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      if (timeLeft['seconds'] === 0) { // TODO: Generalize this to make sure minutes, hours, etc also equal zero
        setWinningString(drawWinner());
        // console.log(winningString);
        setDisplayTicket(displayWinner(winningString));
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  // CHECK WINNER FUNCTIONALITY
  // const [numbers, setNumbers] = useState([]);
  // const [didIWin, setDidIWin] = useState(false);
  // const [loggedInUser, setLoggedInUser] = useState('');

  // Get User Session
  // useEffect(() => {
  //   API.getSession()
  //   .then((res) => setLoggedInUser(res.data.user_id))
  //   //.then((res) => console.log('On Drawing page, logged in as user_id: ', loggedInUser))
  //   .catch((err) => console.log(err));
  // });

  // Mancini's code to check for winners and display Swal
  // useEffect(() => {
  //   API.getAllTickets()
  //     .then(async (res) => {
  //       await setNumbers(res);
  //       let winningTicket = drawWinner();
  //       await setDisplayTicket(winningTicket.split(""));
  //       winOrLose(res, winningTicket);
  //     })
  //     //.then(res => console.log(res.data[0].number))
  //     .catch((err) => console.log(err));
  // }, []);

  // const winOrLose = async (numbers, winningTicket) => {
  //   if (numbers) {
  //     let winner = numbers.data.find((number) => {
  //       return number.number === winningTicket;
  //     });

  //     // console.log(winner);
  //     // if (winner) {
  //     //   console.log("winner");
  //     //   await setDidIWin(true);
  //     // } else {
  //     //   console.log("loser");
  //     //   await setDidIWin(false);
  //     // }
  //     // for (let index = 0; index < numbers.data.length; index++) {
  //     //   const numPick = numbers.data[index].number;
  //     //   console.log(numPick, winningTicket);
  //     //   if (winningTicket === numPick) {
  //     //     console.log("winner");
  //     //   } else {
  //     //     console.log("loser");
  //     //   }
  //     // }
  //   } else {
  //     console.log("sorry");
  //   }
  // };

  //    if (didIWin) {
  //     return (<Winner />);
  //   } else if (isWinner === 2) {
  //     return (<Sorry />);
  //   } else {
  //     console.log("neither");
  //   }

  // RENDER
  return (
    <div>
      <img src={Header3} style={{ maxWidth: "50%", height: "auto" }} alt="Logo" />
      <div className='timer'>
        <h1 style={{ marginTop: "0px", color: "white" }}>Time until the next drawing:</h1>
        <div className='counter'>{timerComponents.length ? timerComponents : <span>Good Luck!</span>}</div>
      </div>
      <div className="wrap">
        <section className="stage">
          <figure className="ball">
            <span className="number" data-number={displayTicket[0]}>
              &nbsp;
            </span>
          </figure>
        </section>
        <section className="stage">
          <figure className="ball">
            <span className="number" data-number={displayTicket[1]}>
              &nbsp;
            </span>
          </figure>
        </section>
        <section className="stage">
          <figure className="ball">
            <span className="number" data-number={displayTicket[2]}>
              &nbsp;
            </span>
          </figure>
        </section>
        <section className="stage">
          <figure className="ball">
            <span className="number" data-number={displayTicket[3]}>
              &nbsp;
            </span>
          </figure>
        </section>
        {/* {didIWin ? <Winner /> : <Sorry />} */}
      </div>
    </div>
  );
};

export default Drawing;
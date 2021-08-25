import React from "react";
import Header3 from "../../images/Header3.png";

const Home = () => {
  return (
    <div>
      <img src={Header3} style={{ maxWidth: "100%", height: "auto" }} alt="Logo" />
      <br></br>
      <a href="#keypad" className="btn btn-warning btn-lg btn-block text-light" role="button" aria-pressed="true">
        Start Game
      </a>
      <div id="explainer" className="mx-5 text-light">
        <p className="mt-5">Why play Select-4?</p>
        <p>Lotteries can be dated back thousands of years. Throughout history, countries around the world such as France, England, the United States, Spain, China and many more have enjoyed this classic game. As the world changed throughout the years, so has the game.</p>
        <p>Our modern day take on the lottery has adapted to our culture and the "new normal" we are all experiencing the wake of the COVID-19 pandemic. We want to give our users the traditional enjoyment we've all grown to love, but in a safe and convenient enviroment... through their own phone. Let's stay safe, save time, make money, and especially have fun playing Select-4.</p>
      </div>
    </div>
  );
};

export default Home;
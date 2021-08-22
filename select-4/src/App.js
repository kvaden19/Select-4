import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavbarLotto from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Keypad from "./components/Keypad/Keypad";
import Wallet from "./components/Wallet/Wallet";
import Drawing from "./components/Drawing/Drawing";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  return (
    <div className="App">
      <Router>
        <NavbarLotto />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/keypad" component={Keypad} />
          <Route exact path="/wallet" component={Wallet} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/drawing" component={Drawing}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

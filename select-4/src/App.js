import React, {Component} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Home from "./components/Home/Home";
import Keypad from "./components/Keypad/Keypad";
import Wallet from "./components/Wallet/Wallet";
import Drawing from "./components/Drawing/Drawing";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

class App extends Component {

  state = {
    NewUsername: '',
    NewPassword: '',
    LoginUsername: '',
    LoginPassword: '',
    Auth: false,
    displayUsername: ''
  };

  Signup = async (e) => {
    e.preventDefault();
    if (this.state.NewUsername && this.state.NewPassword) {
      let usrnm = this.state.NewUsername;
      let pswd = this.state.NewPassword;
      // Send a POST request to the API endpoint
      const response = await axios.post("/api/user", {
        usrnm,
        pswd
      });
      if (response.status === 200) {
        // If successful, redirect the browser to the Wallet page
        this.setState({ Auth: true });
        this.setState({ displayUsername: usrnm });
        document.location.replace("/#/wallet");
        console.log('Response from /api/user: ', response);
      } else {
        alert(response.statusText); // TODO: Make this more user-friendly
      }
    }
  };
    
  LoginUser = async (e) => {
    e.preventDefault();
    if (this.state.LoginUsername && this.state.LoginPassword) {
      let usrnm = this.state.LoginUsername;
      let pswd = this.state.LoginPassword;
      // Send a POST request to the API endpoint
      const response = await axios.post("/api/user/login", {
        usrnm,
        pswd
      });
      if (response.status === 200) {
        // If successful, redirect the browser to the Wallet page
        console.log('Response from /api/user/login: ', response);
        this.setState({ Auth: true });
        this.setState({ displayUsername: usrnm });
        document.location.replace("/#/wallet");
      } else {
        alert(response.statusText); // TODO: Make this more user-friendly
        console.log('Issue');
      }
    }
  };

  Logout = async () => {
    // Send a POST request to the API endpoint
    console.log('Triggered Logout function');
    const response = await axios.post("/api/user/logout");
    if (response.status === 200) {
      // If successful, redirect the browser to the Home page
      this.setState({ Auth: false });
      document.location.replace("/#/home");
    } else {
      console.log(response.statusText); // TODO: Make this more user-friendly
    }
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div className="pt-5">
            <Navbar fixed="top" bg="light" expand="lg">
              <Navbar.Brand href="#home">Select-4</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {/* Conditional render */}
                  {this.state.Auth && <Navbar.Text>Hello, {this.state.displayUsername}!</Navbar.Text>}
                  {!this.state.Auth && <Nav.Link href="#login">Log In</Nav.Link>}
                  {this.state.Auth && <Nav.Link href="#keypad">Keypad</Nav.Link>}
                  {this.state.Auth && <Nav.Link href="#wallet">Wallet</Nav.Link>}
                  <Nav.Link href="#drawing">Drawing</Nav.Link>
                  {this.state.Auth && <Navbar.Text onClick={ this.Logout.bind(this) }>Log Out</Navbar.Text>}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/keypad" component={Keypad} />
            <Route exact path="/wallet" component={Wallet} />
            <Route exact path="/login">
              <div className='container' style={{ height: "100vh" }}>
                <div className='row justify-content-around'>
                  <div className="col-md-4 my-5">
                    <form className="form login-form">
                      <h2 className="text-light">Login</h2>
                      <label className="text-light">username:</label>
                      <input className="form-control" type="text" placeholder="Username" name="loginUsername"
                        onChange={(e) => this.setState({ LoginUsername: e.target.value })}
                      />
                      <label className="text-light">password:</label>
                      <input className="form-control" type="password" placeholder="Password" name="loginPassword"
                        onChange={(e) => this.setState({ LoginPassword: e.target.value })}
                      />
                      <button className="btn btn-success mt-3" onClick={this.LoginUser.bind(this)} type="submit">login</button>
                    </form>
                  </div>

                  <div className="col-md-4 my-5">
                    <form className="form signup-form">
                      <h2 className="text-light">Signup</h2>
                      <label className="text-light">username:</label>
                      <input className="form-control" type="text" placeholder="Username" name="newUsername"
                        onChange={(e) => this.setState({ NewUsername: e.target.value })}
                      />
                      <label className="text-light">password:</label>
                      <input className="form-control" type="password" placeholder="Password" name="newPassword"
                        onChange={(e) => this.setState({ NewPassword: e.target.value })}
                      />
                      <button className="btn btn-primary mt-3" onClick={this.Signup.bind(this)} type="submit">signup</button>
                    </form>
                  </div>
                </div>
              </div>
            </Route>
            <Route exact path="/drawing" component={Drawing}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

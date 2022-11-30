import React from "react";
import "./AppBar.css";
import logo from "./AppBar.logo.svg";
import "./App.css";
import oops from "./oops.jpg";

const Error = () => (
  <div className="App">
    <header>
      <nav className="AppBar">
        <img
          className="AppBar-logo"
          src={logo}
          aria-label="people"
          alt="People"
        />
      </nav>
    </header>
    <main>
      <div className="container">
        <div className="row">
          <h3>Erreur 404</h3>
          <img src={oops} alt="image erreur" height="200px" />
          <div className="col s8">
            <div className="row"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Error;

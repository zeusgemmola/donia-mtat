import React, { useEffect, useState } from "react";
import "./AppBar.css";
import logo from "./AppBar.logo.svg";
import "./App.css";
import error from "./404";
import oops from "./oops.jpg";
import M from "materialize-css";
import "./components/Spinner/Spinner.css";
import Spinner from "./components/Spinner/index";
const App = () => {
  const [rate, setRate] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("CHF");
  const [inputerror, setInputerror] = useState(true);
  useEffect(() => {
    const oReq = new XMLHttpRequest();
    console.log(from);
    console.log(to);
    oReq.addEventListener("load", function () {
      if (this.status == 200) {
        setRate(JSON.parse(this.responseText).data[to].value);
        setInputerror(false);
        Convertisseur(inputValue, JSON.parse(this.responseText).data[to].value);
      }
    });
    oReq.open(
      "GET",
      "https://api.currencyapi.com/v3/latest?apikey=iRGgWTmJ5gGr1SERfbDfkvFbhB996rKkYIruyfXz&base_currency=" +
        from +
        "&currencies=" +
        to +
        ""
    );
    oReq.send();
  }, [from, to]);
  useEffect(() => {
    M.updateTextFields();
  }, []);
  function Convertisseur(val, coef) {
    console.log(val);
    setInputValue(val);
    if (coef != 0) {
      document.getElementById("result").textContent = "resultat: " + coef * val;
    } else {
      document.getElementById("result").textContent = "resultat: " + rate * val;
    }
  }
  if (inputerror == true) {
    return (
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
  } else
    return (
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
              <h3>Convertisseur</h3>
              <div className="col s8">
                <div className="row">
                  <div className="col s6">
                    <label>From</label>
                    <select
                      defaultValue="EUR"
                      className="browser-default"
                      name="inputDevises"
                      id="inputDevises"
                      onChange={(e) => {
                        setFrom(e.target.value);
                      }}
                    >
                      <option value="EUR">EUR</option>
                      <option value="CHF">CHF</option>
                      <option value="GBP">GBP</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <div className="col s6">
                    <label>To</label>
                    <select
                      defaultValue="CHF"
                      className="browser-default"
                      name="outputDevises"
                      onChange={(e) => {
                        setTo(e.target.value);
                      }}
                    >
                      <option value="EUR">EUR</option>
                      <option value="CHF">CHF</option>
                      <option value="GBP">GBP</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="amount"
                      type="text"
                      className=""
                      onChange={(e) => Convertisseur(e.target.value, 0)}
                    />
                    <span
                      className="helper-text"
                      data-error="Erreur"
                      data-success="Valide"
                    ></span>
                    <label htmlFor="amount">Montant</label>
                  </div>
                  <div className="input-field col s12">
                    <h5 id="result">Result : 0</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
};
export default App;

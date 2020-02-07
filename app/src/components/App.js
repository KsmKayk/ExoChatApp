import React, { Component } from "react";
import Messenger from "./messenger";
import "../css/app.css";

export default class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Messenger />
      </div>
    );
  }
}

import React, { Component } from "react";
import Store from "../store";
import Messenger from "./messenger";
import "../css/app.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: new Store(this)
    };
  }

  render() {
    const { store } = this.state;
    return (
      <div className="app-wrapper">
        <Messenger store={store} />
      </div>
    );
  }
}

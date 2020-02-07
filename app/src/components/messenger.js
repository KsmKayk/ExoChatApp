import React, { Component } from "react";

export default class messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight
    };

    this._onResize = this._onResize.bind(this);
  }

  _onResize() {
    this.setState({
      height: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this._onResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this._onResize);
  }

  render() {
    const { height } = this.state;
    const style = {
      height: height
    };

    return (
      <div style={style} className="appMessenger">
        <div className="header">Header</div>
        <div className="main">
          <div className="leftSidebar">Left Sidebar</div>
          <div className="content">Content</div>
          <div className="rightSidebar">Right Sidebar</div>
        </div>
      </div>
    );
  }
}

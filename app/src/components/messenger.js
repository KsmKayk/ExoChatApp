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
        <div className="header">
          <div className="left">
            <div className="actions">
              <button>New message</button>
            </div>
          </div>
          <div className="content">
            <h2>Tittle</h2>
          </div>
          <div className="right">
            <div className="userBar">
              <div className="profileName">Emanulle Leticia</div>
              <div className="profileImage">
                <img
                  src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="leftSidebar">Left Sidebar</div>
          <div className="content">
            <div className="messages">
              <div className="message">
                <div className="messageUserImage">
                  <img
                    src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"
                    alt=""
                  />
                </div>
                <div className="messageBody">
                  <div className="messageAuthor">Emanu says:</div>
                  <div className="messageText">
                    <p>Hello there..</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rightSidebar">Right Sidebar</div>
        </div>
      </div>
    );
  }
}

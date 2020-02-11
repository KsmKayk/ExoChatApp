import React, { Component } from "react";
import classNames from "classnames";
import Avatar from "../css/Avatar.png";

export default class messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      messages: []
    };

    this._onResize = this._onResize.bind(this);

    this.addTestMessages = this.addTestMessages.bind(this);
  }

  _onResize() {
    this.setState({
      height: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this._onResize);

    this.addTestMessages();
  }

  addTestMessages() {
    let { messages } = this.state;

    for (let i = 0; i < 100; i++) {
      let isMe = false;

      if (i % 2 === 0) {
        isMe = true;
      }
      const newMsg = {
        author: `${i}`,
        body: `The body of message ${i}`,
        avatar: Avatar,
        me: isMe
      };

      messages.push(newMsg);
    }

    this.setState({ messages: messages });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._onResize);
  }

  render() {
    const { height, messages } = this.state;
    const style = {
      height: height
    };

    console.log(messages);

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
                <img src={Avatar} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="leftSidebar">
            <div className="channels">
              <div className="channel">
                <div className="userImage">
                  <img src={Avatar} alt="" />
                </div>
                <div className="channelInfo">
                  <h2>Jhonas Alucard</h2>
                  <p>Hello There...</p>
                </div>
              </div>

              <div className="channel">
                <div className="userImage">
                  <img src={Avatar} alt="" />
                </div>
                <div className="channelInfo">
                  <h2>Lucifer MoorningStar</h2>
                  <p>Hello There...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="messages">
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={classNames("message", { me: message.me })}
                  >
                    <div className="messageUserImage">
                      <img src={message.avatar} alt="" />
                    </div>
                    <div className="messageBody">
                      <div className="messageAuthor">
                        {message.me ? "You" : message.author} says:
                      </div>
                      <div className="messageText">
                        <p>{message.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="messengerInput">
              <div className="textInput">
                <textarea placeholder="Write your message..." />
              </div>
              <div className="actions">
                <button className="send">Send</button>
              </div>
            </div>
          </div>
          <div className="rightSidebar">
            <h2 className="title">Members</h2>
            <div className="members">
              <div className="member">
                <div className="userImage">
                  <img src={Avatar} alt="" />
                </div>
                <div className="memberInfo">
                  <h2>Licifer MoorningStar</h2>
                  <p>Joined at 3 days ago</p>
                </div>
              </div>

              <div className="member">
                <div className="userImage">
                  <img src={Avatar} alt="" />
                </div>
                <div className="memberInfo">
                  <h2>Jhonas Alucard</h2>
                  <p>Joined at 5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

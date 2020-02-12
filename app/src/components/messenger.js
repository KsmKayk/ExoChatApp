import React, { Component } from "react";
import classNames from "classnames";
import Avatar from "../css/Avatar.png";
import { OrderedMap } from "immutable";
import _ from "lodash";
import { ObjectID } from "../helpers/objectid";

export default class messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      newMessage: "Hello There..."
    };

    this._onResize = this._onResize.bind(this);

    this.addTestMessages = this.addTestMessages.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(message) {
    return <p dangerouslySetInnerHTML={{ __html: _.get(message, "body") }} />;
  }

  handleSend() {
    const { newMessage } = this.state;
    const { store } = this.props;
    const messageId = new ObjectID().toString();
    const channel = store.getActiveChannel();
    const channelId = _.get(channel, "_id", null);
    const currentUser = store.getCurrentUser();
    const message = {
      _id: messageId,
      channelId: channelId,
      body: newMessage,
      author: _.get(currentUser, "name", null),
      avatar: Avatar,
      me: true
    };

    store.addMessage(messageId, message);

    this.setState({
      newMessage: ""
    });
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
    const { store } = this.props;

    //test messages
    for (let i = 0; i < 100; i++) {
      let isMe = false;

      if (i % 2 === 0) {
        isMe = true;
      }
      const newMsg = {
        _id: `${i}`,
        author: `${i}`,
        body: `The body of message ${i}`,
        avatar: Avatar,
        me: isMe
      };

      store.addMessage(i, newMsg);
    }

    //test channels

    for (let c = 0; c < 10; c++) {
      let newChannel = {
        _id: `${c}`,
        title: `Channel title ${c}`,
        lastMessage: `Hey There..${c}`,
        members: new OrderedMap({
          "2": true,
          "3": true,
          "1": true
        }),
        messages: new OrderedMap()
      };

      let msgId = `${c}`;
      let moreMsg = `${c + 1}`;
      newChannel.messages = newChannel.messages.set(msgId, true);
      newChannel.messages = newChannel.messages.set(moreMsg, true);

      store.addChannel(c, newChannel);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._onResize);
  }

  render() {
    const { store } = this.props;
    const { height } = this.state;
    const style = {
      height: height
    };

    const activeChannel = store.getActiveChannel();
    const messages = store.getMessagesFromChannel(activeChannel); //store.getMessages();
    const channels = store.getChannels();
    const members = store.getMembersFromChannel(activeChannel);

    return (
      <div style={style} className="appMessenger">
        <div className="header">
          <div className="left">
            <div className="actions">
              <button>New message</button>
            </div>
          </div>
          <div className="content">
            <h2>{_.get(activeChannel, "title", "")}</h2>
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
              {channels.map((channel, key) => {
                return (
                  <div
                    onClick={key => {
                      store.setActiveChannelId(channel._id);
                    }}
                    key={channel._id}
                    className={classNames("channel", {
                      active:
                        _.get(activeChannel, "_id") ===
                        _.get(channel, "_id", null)
                    })}
                  >
                    <div className="userImage">
                      <img src={Avatar} alt="" />
                    </div>
                    <div className="channelInfo">
                      <h2>{channel.title}</h2>
                      <p>{channel.lastMessage}</p>
                    </div>
                  </div>
                );
              })}
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
                        {this.renderMessage(message)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="messengerInput">
              <div className="textInput">
                <textarea
                  onKeyUp={event => {
                    if (event.key == "Enter" && !event.shiftKey) {
                      this.handleSend();
                    }
                  }}
                  onChange={event => {
                    this.setState({
                      newMessage: _.get(event, "target.value")
                    });
                  }}
                  value={this.state.newMessage}
                  placeholder="Write your message..."
                />
              </div>
              <div className="actions">
                <button onClick={this.handleSend} className="send">
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="rightSidebar">
            <h2 className="title">Members</h2>
            <div className="members">
              {members.map((member, key) => {
                return (
                  <div key={key} className="member">
                    <div className="userImage">
                      <img src={Avatar} alt="" />
                    </div>
                    <div className="memberInfo">
                      <h2>{member.name}</h2>
                      <p>Joined at 3 day ago</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

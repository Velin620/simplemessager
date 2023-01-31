import React from 'react';
import {useState} from "react";

function TopicView( {stompClient, username} ) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  function setConnected(connected) {
    setIsSubscribed(connected);
    const conversationDiv = document.getElementById('conversation');
    if (connected) {
      conversationDiv.style.visibility = 'visible';
    }else{
      conversationDiv.style.visibility = 'hidden';
    }
  }

  function connectMessage() {
    if (stompClient === null || stompClient.connected === false){
      alert('Please connect to socket');
      setConnected(false)
      return;
    }
    stompClient.subscribe('/topic/greetings', function (greeting) {
      console.log(greeting);
      showGreeting(JSON.parse(greeting.body).text);
    });
    setConnected(true);
    console.log('Connected message');
  }
  function disconnectMessage() {
    if (stompClient === null || stompClient.connected === false){
      alert('Please connect to socket');
      setConnected(false)
      return;
    }
    stompClient.unsubscribe('/topic/greetings');
    setConnected(false);
    console.log("Disconnected Message");
  }

  function sendName() {
    if (stompClient === null || stompClient.connected === false){
      alert('Please connect to socket');
      setConnected(false)
      return;
    }
    stompClient.send("/app/hello", {}, JSON.stringify({'from': username}));
  }

  function showGreeting(message) {
    const greetings = document.getElementById('greetings');
    greetings.innerHTML += ("<p>" + message + "</p>");
  }

  return (
    <div className="Topic">
      <div className="message-form">
        <div className="form-group">
          <label htmlFor="message">Message connection: </label>
          <button id="message" disabled={isSubscribed} onClick={connectMessage}>SubscribeMessage</button>
          <button id="message-unsubscribe" disabled={!isSubscribed} onClick={disconnectMessage}>UnsubscribeMessage</button>
        </div>
      </div>
      <div className="name-input">
        <div className="form-group">
          <button id="send-message" onClick={sendName}>Send hello
          </button>
        </div>
      </div>
      <div id="conversation" className="table table-striped">
        <h3>Greetings</h3>
        <div id="greetings"></div>
      </div>
    </div>
  );
}

export default TopicView;

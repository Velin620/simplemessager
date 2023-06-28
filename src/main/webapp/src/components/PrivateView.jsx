import React from 'react';
import {useState} from "react";



function PrivateView( {stompClient, username, setConnected} ) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [to, setTo] = useState('');


  function setSubscribed(connected) {
    setIsSubscribed(connected);
    // const conversationDiv = document.getElementById('conversation');
    // if (connected) {
    //   conversationDiv.style.visibility = 'visible';
    // }else{
    //   conversationDiv.style.visibility = 'hidden';
    // }
  }

  function connectMessage() {
    if (stompClient === null || stompClient.connected === false){
      alert('Please connect to socket');
      setConnected(false)
      return;
    }
    console.log(`/user/queue/chat`);
    stompClient.subscribe(`/user/queue/chat`, function (greeting) {
      console.log(greeting);
      let mess = greeting.body;
      showGreeting(mess);

    });
    setSubscribed(true);
    console.log('Connected message');
  }

  function disconnectMessage() {
    if (stompClient === null || stompClient.connected === false){
      alert('Please connect to socket');
      setConnected(false)
      return;
    }
    stompClient.unsubscribe(`/user/queue/chat`);
    setSubscribed(false);
    console.log("Unsubscribed Message");
  }

  function sendMessage() {
    if (stompClient === null || stompClient.connected === false){
      alert('Please connect to socket');
      setConnected(false)
      return;
    }
    stompClient.send(`/app/private`, {}, JSON.stringify({'from': username , 'to': to}));
  }

  function showGreeting(message) {
    const greetings = document.getElementById('greetings');
    greetings.innerHTML += ("<p>" + message + "</p>");
  }

  function setChat(){
    let chat = document.getElementById('chat').value;
    setTo(chat);
    console.log(to);
  }

  return (
    <div className="Private">
      <div className="name-input">
        <label htmlFor="name">Chat </label>
        <input type="text" id="chat" className="form-control"
               placeholder="Chat name..." ></input>
        <button id="send-message" onClick={setChat}>Set chat
        </button>
      </div>
      <div className="message-form">
        <label htmlFor="message">Message connection: </label>
        <button id="message" disabled={isSubscribed} onClick={connectMessage}>SubscribeMessage</button>
        <button id="message-unsubscribe" disabled={!isSubscribed} onClick={disconnectMessage}>UnsubscribeMessage</button>
      </div>
      <button id="send-private-message" disabled={!isSubscribed} onClick={sendMessage}>Send private greeting</button>
      <div id="conversation" >
        <h3>Greetings</h3>
        <div id="greetings"></div>
      </div>
    </div>
  );
}

export default PrivateView;

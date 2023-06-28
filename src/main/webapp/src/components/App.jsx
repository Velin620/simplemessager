import React from 'react';
import {useState} from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import TopicView from "./TopicView";
import PrivateView from "./PrivateView";


function App() {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [privateViewMode, setPrivateViewMode] = useState(false);
  const [username, setUsername] = useState('');


  function connect() {
    let socket = new SockJS('http://localhost:8080/websocket-sockjs-stomp');
    const stomp = Stomp.over(socket);
    stomp.connect({ username : username}, function (frame) {
      console.log('Connected: ' + frame);
    });
    setConnected(true);
    setStompClient(stomp);
  }


  function connectSubscribe() {
    if (stompClient === null || stompClient.connected === false){
      alert('Please connect to socket');
      setConnected(false)
      return;
    }
    stompClient.subscribe('/app/subscribe',
      function (response) {
        showResponse(response.body);
      });
    console.log('Subscribed');
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    setStompClient(null);
    setConnected(false);
    console.log("Disconnected");
  }

  function showResponse(message) {
    const subscribeResponse = document.getElementById('subscribe-response-content');
    subscribeResponse.innerHTML += ("<p>" + message + "</p>");
  }
  function sendSubscribe() {
    if (stompClient === null || stompClient.connected === false){
      alert('Please connect to socket');
      setConnected(false)
      return;
    }
    stompClient.send("/app/subscribe", {}, JSON.stringify({'name': 'subscribe'}));
  }

  function changeViewMode() {
    setPrivateViewMode(!privateViewMode);
  }

  function setUser() {
    let name = document.getElementById('name').value;
    setUsername(name);
    console.log(name);
  }

  return (
    <div className="App" style = {{margin : 15} }>
      <label htmlFor="name">Your name </label>
      <input type="text" id="name"
             placeholder="Your name here..." ></input>
      <button id="send-message" onClick={setUser} >Set name
      </button>
      <br/>
      <button id="connect" type="submit" onClick={connect} disabled={connected}>Connect to socket</button>
      <button id="disconnect" type="submit" onClick={disconnect} disabled={!connected}>Disconnect</button>
      <br/>
      <br/>
      <div className="app-container" style={{ visibility: !connected ? "hidden" : "visible" }}>
        <div className="subscribe-container">
          <button id="subscribe" type="submit" onClick={connectSubscribe}>Subscribe</button>
          <div id="subscribe-response">
            <h3>Subscribe Response</h3>
            <div id="subscribe-response-content"></div>
          </div>
          <button id="subscribe" type="submit" onClick={sendSubscribe}>Send hello to subscribe</button>
        </div>
        <br/>
        <br/>
        <button id="changeView" type="submit" onClick={changeViewMode}>Change view mode</button>

        {privateViewMode?
          <PrivateView
            stompClient={stompClient}
            username={username}
            setConnected={setConnected}
          /> :
          <TopicView
            stompClient={stompClient}
            username={username}
            setConnected={setConnected}
          />
        }
      </div>
    </div>
  );
}

export default App;

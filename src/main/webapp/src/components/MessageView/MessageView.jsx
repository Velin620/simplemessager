import React from 'react'
import { useEffect } from 'react'


const MessageView = ({isConnected, author, stompClient, outputMessage}) => {
  
  useEffect (() => {
    showMessageOutput(outputMessage);
    console.log("message: " + outputMessage);
  }, [outputMessage] );
  
  function sendMessage() {
    const from = author;
    const text = document.getElementById('text').value;
    stompClient.send("/app/chat", {}, 
    JSON.stringify({'from':from, 'text':text}));
    
    console.log("outputMessage " + outputMessage);
  }
  
  function showMessageOutput(outputMessage) {
    if (outputMessage === null) 
    return;
    else{
      let message = JSON.parse(outputMessage.body);
      const response = document.getElementById('response');
      let p = document.createElement('p');
      p.appendChild(document.createTextNode(message.from + ": " 
      + message.text + " (" + message.time + ")"));
      response.appendChild(p);
    }
  }
  
  return (
    <div id="MessageView" style={{visibility: isConnected? "visible" : "hidden"}}>
    
    <div id="conversationDiv">
    <input type="text" id="text" placeholder="Write a message..."/>
    <button id="sendMessage" onClick={() => sendMessage()}>Send</button>
    
    <p id = "response"></p>
    
    </div>
    {showMessageOutput(outputMessage)}
    </div>
    )
  }
  
  export default MessageView
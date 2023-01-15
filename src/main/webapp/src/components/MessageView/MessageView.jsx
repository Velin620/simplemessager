import React from 'react'

const MessageView = ({isConnected, author, stompClient}) => {
  
  stompClient.subscribe('/topic/messages', function(messageOutput) {
    showMessageOutput(JSON.parse(messageOutput.body));
  });

  function sendMessage() {
    const from = author;
    const text = document.getElementById('text').value;
    stompClient.send("/app/chat", {}, 
      JSON.stringify({'from':from, 'text':text}));
  }

  function showMessageOutput(messageOutput) {
    const response = document.getElementById('response');
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(messageOutput.from + ": " 
      + messageOutput.text + " (" + messageOutput.time + ")"));
    response.appendChild(p);
}

  return (
    <div id="MessageView" style={{visibility: isConnected? "visible" : "hidden"}}>
      
      <div id="conversationDiv">
        <input type="text" id="text" placeholder="Write a message..."/>
        <button id="sendMessage" onClick={() => sendMessage()}>Send</button>
        <p id="response"></p>
      </div>
    
    </div>
  )
}

export default MessageView
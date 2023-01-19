import React from 'react'


function MessageSend({author, stompClient, currentChat}) {

  function sendMessage() {
    const from = author;
    const text = document.getElementById('text').value;
    stompClient.send(currentChat === "allchat"? "/app/allchat" : `/app/private/${currentChat}`, {}, 
    JSON.stringify({'from':from, 'text':text, 'to':currentChat}));
  }
  
  return (
    <div id="MessageSend">
        <input type="text" id="text" placeholder="Write a message..."/>
        <button id="sendMessage" onClick={() => sendMessage()}>Send</button>
    
    </div>
    )
  }
  export default MessageSend
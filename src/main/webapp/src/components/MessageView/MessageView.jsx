import React from 'react'
import axios from 'axios';

const MessageView = ({connection, author, stompClient, currentChat}) => {
  
  let lastPrinted = 0;

  function sendMessage() {
    const from = author;
    const text = document.getElementById('text').value;
    stompClient.send(currentChat === "allchat"? "/app/allchat" : `/app/private/${currentChat}`, {}, 
    JSON.stringify({'from':from, 'text':text}));
  }
  
  async function showMessageOutput() {  
    axios.get(`http://localhost:8080/${currentChat}/history`)
    .then(response => {
      const data = response.data;
      let messageDiv = document.getElementById("response");
      
      if (lastPrinted < data[0].id){
        let nextPrint = 0;
        for (nextPrint; lastPrinted < data[nextPrint].id; nextPrint++) {
          ;
        }
        for(nextPrint; nextPrint >= 0; nextPrint--){
          messageDiv.innerHTML += `<p>${data[nextPrint].from}: ${data[nextPrint].text} (${data[nextPrint].time}) </p>`;
          lastPrinted = data[nextPrint].id;
        }
      }else{
        return;
      }
    })
  }
  
  return (
    <div id="MessageView" style={{visibility: connection === "connected" ? "visible" : "hidden"}}>
    
    <div id="conversationDiv">
    <input type="text" id="text" placeholder="Write a message..."/>
    <button id="sendMessage" onClick={() => sendMessage()}>Send</button>
    
    <p id = "response"></p>
    
    </div>
    {setTimeout(()=> showMessageOutput(), 5000)}
    </div>
    )
  }
  
  export default MessageView
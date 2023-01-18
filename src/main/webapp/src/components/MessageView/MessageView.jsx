import React from 'react'
import axios from 'axios';
import { useState } from 'react'

function MessageView({author, stompClient, currentChat}) {
  
   const [lastPrinted, setLastPrinted] = useState(0);
   const [data, setData] = useState();
   

  function sendMessage() {
    const from = author;
    const text = document.getElementById('text').value;
    stompClient.send(currentChat === "allchat"? "/app/allchat" : `/app/private/${currentChat}`, {}, 
    JSON.stringify({'from':from, 'text':text, 'to':currentChat}));
  }
  
  function getDataFromApi () {
    console.log(currentChat);
    axios.get(`http://localhost:8080/${currentChat}/history`)
    .then(response => {
      let newdata = response.data;
      console.log(newdata, lastPrinted);
      if (lastPrinted < newdata[0].id){
        setData(newdata);
        }
    })
  }

  function showMessageOutput() {  
      let messageDiv = document.getElementById("response");
      
      if (lastPrinted < data[0].id){
        let nextPrint = 0;
        console.log(lastPrinted, data[nextPrint].id)
        for(nextPrint = data.length-1; nextPrint >= 0; nextPrint--){
          if(lastPrinted < data[nextPrint].id){
            messageDiv.innerHTML += `<p>${data[nextPrint].from}: ${data[nextPrint].text} (${data[nextPrint].time}) </p>`;
            setLastPrinted( data[nextPrint].id);
          }
        }
      }else{
        return;
      }
  }
  
  return (
    <div id="MessageView">
    {getDataFromApi()}
    {setInterval(() => {getDataFromApi()}, 30000)}
      <div id="conversationDiv">
        <input type="text" id="text" placeholder="Write a message..."/>
        <button id="sendMessage" onClick={() => sendMessage()}>Send</button>
        {setTimeout(() => showMessageOutput(), 5000)}
        <div id = "response"></div>
      
      </div>
    
    </div>
    )
  }
  export default MessageView
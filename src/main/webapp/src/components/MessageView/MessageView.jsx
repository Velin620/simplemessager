import React from 'react'
import axios from 'axios';
import { useState } from 'react'

function MessageView({author, currentChat}) {
    const [lastPrinted, setLastPrinted] = useState(0);
    const [data, setData] = useState();

    function getDataFromApi () {
        console.log(currentChat);
        axios.get(`http://localhost:8080/${currentChat}-${author}/history`)
        .then(response => {
          let newdata = response.data;
          console.log(newdata, lastPrinted);
          if (lastPrinted < newdata[0].id){
            setData(newdata);
            }
        })
        setTimeout(() => showMessageOutput(), 3000);
      }
    
    function showMessageOutput() {  
    let messageDiv = document.getElementById("response");
    console.log(lastPrinted, data[0].id)
    if (lastPrinted < data[0].id){
        for(let nextPrint = data.length-1; nextPrint >= 0; nextPrint--){
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
    <>
        <button id="getMessages" onClick={() => getDataFromApi()}>Get messages</button>
        <div id="response"></div>
    </>
  )
}

export default MessageView
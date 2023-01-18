import React from 'react'
import { useState } from 'react'

function ChatChoice ({handleConnect, handleDisconnect}) {

  const [chat, setChat] = useState(null);

  function handleChange(e) {
      setChat(e.target.value);
  }
  
  return (
    <>
        <input type="text" id="chat" placeholder="Choose a chat to connect" onChange={(e)=>handleChange(e)}/>
        <button onClick={() => handleConnect(chat)}>Connect</button>
        <button onClick={() => handleDisconnect()}>Disconnect</button>
    </>
  )
}

export default ChatChoice
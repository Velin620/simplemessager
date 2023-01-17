import React from 'react'

const ChatChoice = ({handleConnect, handleDisconnect}) => {

    let chat = document.getElementById('chat').value === null? document.getElementById('chat').value : "allchat";

  return (
    <>
        <input type="text" id="chat" placeholder="Choose a chat to connect"/>
        <button onClick={handleConnect(chat)}>Connect</button>
        <button onClick={handleDisconnect()}>Disconnect</button>
    </>
  )
}

export default ChatChoice
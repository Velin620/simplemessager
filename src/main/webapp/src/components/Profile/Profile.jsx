import React from 'react'


const Profile = ({isConnected, handleConnected, handleAuthor, stompClient}) => {

  function connect() {
    handleConnected(true);
    handleAuthor(document.getElementById('from').value);
    console.log('Connected');
}

function disconnect() {
  // if(stompClient != null) {
  //     stompClient.disconnect();
  // }
  handleConnected(false);
  console.log("Disconnected");
}


  return (
    <div>
      <div>
        <input type="text" id="from" placeholder="Choose a nickname"/>
      </div>
      <br />
      <div>
        <button id="connect" disabled={isConnected} onClick={() => connect()}>Connect</button>
        <button id="disconnect" disabled={!isConnected} onClick={() => disconnect()}>
        Disconnect
        </button>
      </div>
      <br />
    </div>
  )
}

export default Profile
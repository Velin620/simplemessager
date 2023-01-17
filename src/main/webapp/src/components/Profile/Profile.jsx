import React from 'react'


const Profile = ({handleAuthor, author}) => {

let newAuthor = null


function connect() {
  newAuthor = document.getElementById('from').value;
  handleAuthor(newAuthor);
  console.log('Author: ' + newAuthor);
}

function disconnect() {
  handleAuthor(null);
  console.log("Disconnected");
}


  return (
    <div>
      <div>
        <input type="text" id="from" placeholder="Choose a nickname"/>
      </div>
      <div>
        {author === null && newAuthor != null ? 
          <button onClick={connect}>Connect</button> :
          author != null && newAuthor != null ?
          <button onClick={connect}>Change username</button> :
          author != null && newAuthor === null ?
          <button onClick={disconnect}>Disconnect</button> :
          <button disabled = "true" >Connect</button>}
      </div>
      <br />
    </div>
  )
}

export default Profile
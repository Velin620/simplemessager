import React from 'react'
import { useState } from 'react'

function Profile ({handleAuthor, author}) {

const [newAuthor, setNewAuthor] = useState(null);

function handleChange(e) {
  setNewAuthor(e.target.value);
}

function connect() {
  handleAuthor(newAuthor);
  console.log('Author: ' + newAuthor);
}

function disconnect() {
  handleAuthor(newAuthor);
  console.log("Disconnected");
}


  return (
    <div>
      <div>
        <input type="text" id="from" placeholder="Choose a nickname" onChange={(e) => handleChange(e)}/>
      </div>
      <div>
        {author == null && newAuthor != null ? 
          <button onClick={()=>connect()}>Connect</button> :
          author != null && newAuthor != null ?
          <button onClick={()=>connect()}>Change username</button> :
          author != null && ( newAuthor === null || newAuthor=== "") ?
          <button onClick={()=>disconnect()}>Disconnect</button> :
          <button disabled = {true} >Connect</button>}
      </div>
      <br />
    </div>
  )
}

export default Profile
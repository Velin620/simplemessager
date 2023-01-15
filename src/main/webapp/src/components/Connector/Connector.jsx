import React from 'react'
import { useState } from 'react'
import { Profile, MessageView } from '../index'

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const Connector = () => {
    const [isConnected, setConnected] = useState(false);
    const [author, setAuthor] = useState('');
    const [stompClient, setStompClient] = useState(null);

    const socket = new SockJS('/chat');
    setStompClient(Stomp.over(socket));  
    stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);
    });  

    const handleConnected = (connected) => {
        setConnected(connected);
    }

    const handleAuthor = (author) => {
        setAuthor(author);
    }

  
    return (
        <>
            <Profile 
                isConnected={isConnected} 
                handleConnected={(x) => handleConnected(x)} 
                handleAuthor = {(a) => handleAuthor(a)} 
                stompClient={stompClient}
                setStompClient = {(stomp) => setStompClient(stomp)}/>
            <MessageView isConnected={isConnected} author={author} stompClient={stompClient}/>
        </>
    )
}

export default Connector
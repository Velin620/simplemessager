import React from 'react'
import { useState } from 'react'
import { Profile, MessageView } from '../index'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Connector = () => {
    const [isConnected, setConnected] = useState(false);
    const [author, setAuthor] = useState('');
    const [outputMessage, setOutputMessage] = useState(null);
    

    let stompClient = connectStomp();

    function connectStomp() {
        let stompClient = null;
        const socket = new SockJS('http://localhost:8080/chat');
        console.log("socket: " + socket);
        stompClient= Stomp.over(socket);  
        stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function(OutputMessage) {
            setOutputMessage( OutputMessage);
            console.log("outputMessage: " + outputMessage);
        });
        }); 
        return stompClient;
    }

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
                />
            <MessageView 
                isConnected={isConnected} 
                author={author} 
                outputMessage = {outputMessage} 
                stompClient = {stompClient}/>
        </>
    )
}

export default Connector
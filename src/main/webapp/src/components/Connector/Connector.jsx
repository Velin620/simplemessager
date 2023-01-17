import React from 'react'
import { useState } from 'react'
import { Profile, MessageView, ChatChoice } from '../index'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Connector = () => {
    const [connection, setConnection] = useState("disconnected");
    const [author, setAuthor] = useState('');
    
    let currentChat = "allchat";
    let stompClient = null;
    

    function connectStomp(chat) {
        let url = null;
        currentChat = chat;
        chat === "allchat" ? url = "allchat" : url = "private/" + chat;
        let stompClient = null;
        const socket = new SockJS(`http://localhost:8080/${url}`);
        stompClient= Stomp.over(socket);  
        stompClient.connect({}, function(frame) {
        setConnection("connected");
        console.log('Connected: ' + frame);
        }); 
        console.log('Connected');
        return stompClient;
    }

    const handleDisconnect = () => {
        stompClient && stompClient.disconnect();
        setConnection("disconnected");
        console.log("Disconnected");
    }

    const handleAuthor = (author) => {
        setAuthor(author);
        console.log(author);
    }

  
    return (
        <>
            <Profile 
                author={author} 
                handleAuthor = {(a) => handleAuthor(a)} 
                />
            <ChatChoice 
                handleConnect = {(c) => connectStomp(c)}
                handleDisconnect = {() => handleDisconnect()}
            />
            <MessageView 
                connection={connection} 
                author={author} 
                currentChat = {currentChat} 
                stompClient = {stompClient}/>
        </>
    )
}

export default Connector
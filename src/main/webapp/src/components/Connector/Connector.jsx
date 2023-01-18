import React from 'react'
import { useState } from 'react'
import { Profile, MessageView, ChatChoice } from '../index'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Connector () {
    const [connection, setConnection] = useState("disconnected");
    const [author, setAuthor] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [currentChat, setCurrentChat] = useState("allchat");
    

    function connectStomp(chat) {
        let url = null;
        setCurrentChat (chat);
        chat === "allchat" ? url = "allchat" : url = "private/" + chat;
        const socket = new SockJS(`http://localhost:8080/${url}`);
        let st = Stomp.over(socket);
        console.log(st);
        console.log(stompClient);
        st.connect({}, function(frame) {
            setConnection("connected");
            console.log('Connected: ' + frame);
        }); 
        setStompClient(st);
        console.log('Connected');
        return stompClient;
    }

    function handleDisconnect() {
        stompClient && stompClient.disconnect();
        setConnection("disconnected");
        console.log("Disconnected");
    }

    function handleAuthor(author) {
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
            {connection === "connected" ?
                <MessageView  
                    author={author} 
                    currentChat = {currentChat} 
                    stompClient = {stompClient}/>:
                <p>Not connected</p>}
        </>
    )
}

export default Connector
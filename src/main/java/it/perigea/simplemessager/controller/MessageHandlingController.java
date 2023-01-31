package it.perigea.simplemessager.controller;



import it.perigea.simplemessager.configuration.WebSocketConfig;
import it.perigea.simplemessager.model.MessageModel;
import it.perigea.simplemessager.model.OutputMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class MessageHandlingController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public OutputMessage sendBroadcast(MessageModel message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new OutputMessage(message.getFrom());
    }
    @SubscribeMapping("/subscribe")
    public String sendOneTimeMessage() {
        return "server one-time message via the application";
    }

    @MessageMapping("/private")
//    @SendToUser("/queue/chat") invia il messaggio al client che ha fatto la richiesta
    public void sendPrivate(@Payload MessageModel message) throws Exception {
        System.out.println("===============================================");
        System.out.println("debug: MessageHandlingController.sendPrivate");
//        System.out.println("debug: username: " + principal.getName());
        System.out.println("debug: destination user: " + message.getTo());
        System.out.println("===============================================");
        String output = "Hello " + message.getTo() + " from " + message.getFrom();
        simpMessagingTemplate.convertAndSendToUser(message.getTo(), "/queue/chat", output); // invia il messaggio al client specificato
    }
}

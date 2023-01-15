package it.perigea.simplemessager.controller;

import it.perigea.simplemessager.model.MessageModel;
import it.perigea.simplemessager.model.OutputMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController("/messager")
public class MessageHandlingController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public OutputMessage send(MessageModel message) throws Exception {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        return new OutputMessage(message.getFrom(), message.getText(), time);
    }
}

package it.perigea.simplemessager.controller;

import it.perigea.simplemessager.dto.OutputMessageDto;
import it.perigea.simplemessager.model.MessageModel;
import it.perigea.simplemessager.service.SenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*", originPatterns = "*")
public class MessageHandlingController {

    @Autowired
    private SenderService senderService;

    @MessageMapping("/allchat")
//    @SendTo("/topic/messages")
    public OutputMessageDto sendAll(MessageModel message) throws Exception {
        OutputMessageDto result = senderService.sendAll(message);
        return result;
    }

    @MessageMapping("/private/{username}")
//    @SendTo("/queue/private/{username}")
    public OutputMessageDto sendPrivate(@PathVariable String username, MessageModel message) throws Exception {
        OutputMessageDto result = senderService.sendPrivate(message, username);
        return result;
    }

    @GetMapping("/{chatName}/history")
    public List<OutputMessageDto> getHistory(@PathVariable String chatName) {
        return senderService.getHistory(chatName);
    }
}

package it.perigea.simplemessager.service;

import it.perigea.simplemessager.dto.OutputMessageDto;
import it.perigea.simplemessager.entity.OutputMessage;
import it.perigea.simplemessager.model.MessageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import it.perigea.simplemessager.dao.MessageHistoryRepository;
import it.perigea.simplemessager.service.MessageMapper;

@Service
public class SenderService {

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private MessageHistoryRepository messageHistoryRepository;


    public OutputMessageDto sendAll(MessageModel message) {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        OutputMessageDto result = new OutputMessageDto(message.getFrom(), "allchat", message.getText(), time);
        OutputMessage outputMessage = messageMapper.toEntity(result);
        messageHistoryRepository.save(outputMessage);
        return result;
    }

    public OutputMessageDto sendPrivate(MessageModel message, String username) {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        OutputMessageDto result = new OutputMessageDto(message.getFrom(), message.getTo(), message.getText(), time);
        OutputMessage outputMessage = messageMapper.toEntity(result);
        messageHistoryRepository.save(outputMessage);
        return result;
    }

    public List<OutputMessageDto> getHistory(String chatName, String username) {

        List<OutputMessage> outputMessageList = messageHistoryRepository.findByChat(chatName, username);
        return messageMapper.toDtoList(outputMessageList);
    }
}

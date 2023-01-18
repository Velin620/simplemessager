package it.perigea.simplemessager.service;

import it.perigea.simplemessager.dto.OutputMessageDto;
import it.perigea.simplemessager.entity.OutputMessage;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MessageMapper {

    public OutputMessageDto toDto(OutputMessage outputMessage) {
        if ( outputMessage == null ) {
            return null;
        }

        OutputMessageDto outputMessageDto = new OutputMessageDto();

        outputMessageDto.setId( outputMessage.getId() );
        outputMessageDto.setFrom( outputMessage.getFrom() );
        outputMessageDto.setTo( outputMessage.getTo() );
        outputMessageDto.setText( outputMessage.getText() );
        outputMessageDto.setTime( outputMessage.getTime() );

        return outputMessageDto;
    }
    public OutputMessage toEntity(OutputMessageDto outputMessageDto) {
        if ( outputMessageDto == null ) {
            return null;
        }

        OutputMessage outputMessage = new OutputMessage();

        outputMessage.setFrom( outputMessageDto.getFrom() );
        outputMessage.setTo( outputMessageDto.getTo() );
        outputMessage.setText( outputMessageDto.getText() );
        outputMessage.setTime( outputMessageDto.getTime() );


        return outputMessage;
    }

    public List<OutputMessageDto> toDtoList(List<OutputMessage> outputMessageList) {
        if ( outputMessageList == null ) {
            return null;
        }

        List<OutputMessageDto> list = new ArrayList<OutputMessageDto>( outputMessageList.size() );
        for ( OutputMessage outputMessage : outputMessageList ) {
            list.add( toDto( outputMessage ) );
        }

        return list;
    }
}

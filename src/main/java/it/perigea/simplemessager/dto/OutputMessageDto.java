package it.perigea.simplemessager.dto;

import lombok.Data;

@Data
public class OutputMessageDto {

    private Integer id;
    private String from;
    private String to;

    private String text;

    private String time;


    public OutputMessageDto(String from, String to, String text, String time) {
        this.from = from;
        this.to = to;
        this.text = text;
        this.time = time;
    }

    public OutputMessageDto() {
    }
}


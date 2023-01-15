package it.perigea.simplemessager.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OutputMessage {
    private String text;
    private String from;
    private String time;

}

package it.perigea.simplemessager.model;


import lombok.Data;

@Data
public class OutputMessage {
    private String from;
    private String to;
    private String text;

    public OutputMessage(String from, String to) {
        this.from = from;
        this.to = to;
        this.text = "Hello " + to + " from " + from;
    }

    public OutputMessage(String from) {
        this.from = from;
        this.text = "Hello from " + from;
    }

}

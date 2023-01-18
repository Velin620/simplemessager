package it.perigea.simplemessager.model;


import lombok.*;

@Data
public class MessageModel {
    private String from;
    private String to;
    private String text;

    public MessageModel(String from, String to, String text) {
        this.from = from;
        this.to = to;
        this.text = text;
    }

    public MessageModel() {
    }

    protected boolean canEqual(final Object other) {
        return other instanceof MessageModel;
    }

}

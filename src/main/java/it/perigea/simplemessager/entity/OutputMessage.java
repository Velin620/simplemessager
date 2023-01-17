package it.perigea.simplemessager.entity;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "message_history", schema = "simplemessager")
public class OutputMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column (name = "messageid")
    private Integer id;

    @Column (name = "author")
    private String from;

    @Column (name = "chat")
    private String to;
    @Column (name = "message")
    private String text;

    @Column (name = "time")
    private String time;

}

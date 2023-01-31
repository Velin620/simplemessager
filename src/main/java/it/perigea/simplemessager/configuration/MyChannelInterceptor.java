package it.perigea.simplemessager.configuration;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptor;

public class MyChannelInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("===============================================");
        System.out.println("debug: MyChannelInterceptor.preSend() called");
        System.out.println("debug: message: " + message);
        System.out.println("debug: channel: " + channel);
        System.out.println("===============================================");
        return message;
    }
}

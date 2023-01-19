package it.perigea.simplemessager.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import it.perigea.simplemessager.entity.OutputMessage;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageHistoryRepository extends JpaRepository<OutputMessage, Integer> {

    @Query("SELECT m FROM OutputMessage m WHERE m.to = :chat OR (m.from = :chat AND m.to = :username)ORDER BY m.id DESC")
    List<OutputMessage> findByChat(@Param("chat") String chat, @Param("username") String username);
}

package com.znzn.chatapp_api.model;

import com.znzn.chatapp_api.enums.RoomType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "room")
public class Room {

    @Id
    private String id;
    private Integer roomNumber;
    private String title;
    private RoomType type;

    private LocalDateTime createdAt;

}

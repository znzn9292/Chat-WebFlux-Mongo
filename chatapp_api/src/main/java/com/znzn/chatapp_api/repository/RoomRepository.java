package com.znzn.chatapp_api.repository;

import com.znzn.chatapp_api.enums.ChatType;
import com.znzn.chatapp_api.model.Chat;
import com.znzn.chatapp_api.model.Room;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface RoomRepository extends ReactiveMongoRepository<Room, String> {

    Flux<Room> findAll();
}

package com.znzn.chatapp_api.repository;

import com.znzn.chatapp_api.enums.RoomType;
import com.znzn.chatapp_api.model.Room;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface RoomRepository extends ReactiveMongoRepository<Room, String> {

    @Tailable
    @Query("{type: ?0}")
    Flux<Room> mfindAll(RoomType roomType);
}

package com.znzn.chatapp_api.repository;

import com.znzn.chatapp_api.model.Chat;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface CharRepository extends ReactiveMongoRepository<Chat, String> {

    @Tailable // 커서를 닫지않고 계속 유지
    @Query("{sender: ?0, receiver: ?1}")
    Flux<Chat> mFindBySender(String sender, String receiver); // Flux : Responsefmf 유지하면서 데이터를 계속 흘려보내기

    @Tailable
    @Query("{roomNumber: ?0}")
    Flux<Chat> mFindByRoomNumber(Integer roomNumber);

}

package com.znzn.chatapp_api.controller;

import com.znzn.chatapp_api.enums.RoomType;
import com.znzn.chatapp_api.model.Chat;
import com.znzn.chatapp_api.model.Room;
import com.znzn.chatapp_api.repository.CharRepository;
import com.znzn.chatapp_api.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
public class RoomController {

    private final CharRepository charRepository;
    private final RoomRepository roomRepository;

    @GetMapping(value = "/room", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @CrossOrigin
    public Flux<Room> findAllRoom() {
        return roomRepository.mfindAll(RoomType.BASIC)
                .subscribeOn(Schedulers.boundedElastic());
    }

    // SSE Protocol (Response 라인이 지속적으로 유지 - Flux)
    @GetMapping(value = "/room/{roomNumber}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @CrossOrigin
    public Flux<Chat> findRoom(@PathVariable Integer roomNumber) {
        return charRepository.mFindByRoomNumber(roomNumber)
                .subscribeOn(Schedulers.boundedElastic());
    }

    @PostMapping("/room")
    @CrossOrigin
    public Mono<Room> setRoom(@RequestBody Room room) {
        room.setCreatedAt(LocalDateTime.now());
        return roomRepository.save(room);
    }

}

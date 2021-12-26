package com.znzn.chatapp_api.controller;

import com.znzn.chatapp_api.Chat;
import com.znzn.chatapp_api.repository.CharRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final CharRepository charRepository;

    // SSE Protocol (Response 라인이 지속적으로 유지 - Flux)
    @GetMapping(value = "/chat/room/{roomNumber}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @CrossOrigin
    public Flux<Chat> findRoom(@PathVariable Integer roomNumber) {
        return charRepository.mFindByRoomNumber(roomNumber)
                .subscribeOn(Schedulers.boundedElastic());
    }

    @GetMapping(value = "/sender/{sender}/receiver/{receiver}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @CrossOrigin
    public Flux<Chat> getMsg(@PathVariable String sender, @PathVariable String receiver) {
        return charRepository.mFindBySender(sender, receiver)
                .subscribeOn(Schedulers.boundedElastic());
    }

    @PostMapping("/chat")
    @CrossOrigin
    public Mono<Chat> setMsg(@RequestBody Chat chat) {
        chat.setCreatedAt(LocalDateTime.now());
        return charRepository.save(chat);
    }

}

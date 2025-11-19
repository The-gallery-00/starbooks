package com.starbooks.controller;

import com.starbooks.entity.Notification;
import com.starbooks.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.save(notification));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNotification(@PathVariable Long id) {
        Optional<Notification> alarm = notificationService.findById(id);
        return alarm.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

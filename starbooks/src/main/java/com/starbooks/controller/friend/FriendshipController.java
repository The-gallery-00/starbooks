package com.starbooks.controller.friend;

import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.friend.FriendDto;
import com.starbooks.service.friend.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


    @RestController
    @RequestMapping("/api/friends")
    @RequiredArgsConstructor
    public class FriendshipController {

        private final FriendshipService friendshipService;
        private final UserRepository userRepository;
        // 친구 검색
        @GetMapping("/search-users")
        public List<User> searchUsers(@RequestParam String keyword) {
            return userRepository.findByNicknameContainingIgnoreCase(keyword);
        }

        // 친구 요청 보내기
        @PostMapping("/request")
        public ResponseEntity<String> sendRequest(
                @RequestParam Long requesterId,
                @RequestParam Long receiverId) {

            friendshipService.sendFriendRequest(requesterId, receiverId);
            return ResponseEntity.ok("친구 요청 보냄");
        }

        // 수락
        @PostMapping("/accept")
        public ResponseEntity<String> acceptRequest(@RequestParam Long friendshipId) {
            friendshipService.acceptFriendRequest(friendshipId);
            return ResponseEntity.ok("친구 요청 수락됨");
        }

        // 거절
        @PostMapping("/reject")
        public ResponseEntity<String> rejectRequest(@RequestParam Long friendshipId) {
            friendshipService.rejectFriendRequest(friendshipId);
            return ResponseEntity.ok("친구 요청 거절됨");
        }

        // 친구 목록 조회
        @GetMapping("/{userId}")
        public ResponseEntity<List<FriendDto>> getFriends(@PathVariable Long userId) {
            return ResponseEntity.ok(friendshipService.getFriends(userId));
        }
    }



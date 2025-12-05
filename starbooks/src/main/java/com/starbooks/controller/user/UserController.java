package com.starbooks.controller.user;

import com.starbooks.domain.reading.ReadingCalendar;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.reading.DailyGoalStatusDto;
import com.starbooks.dto.reading.ReadingProgressResponseDto;
import com.starbooks.dto.user.*;
import com.starbooks.domain.user.User;
import com.starbooks.service.reading.ReadingCalendarService;
import com.starbooks.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepo;  // 🔥 추가
    private final ReadingCalendarService readingCalendarService; // 🔥 추가

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        return ResponseEntity.ok(userService.isUsernameDuplicate(username));
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.isEmailDuplicate(email));
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.isNicknameDuplicate(nickname));
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> create(@RequestBody UserRequestDto dto) {
        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .passwordHash(dto.getPassword()) // 실무에선 Bcrypt 필수
                .nickname(dto.getNickname())
                .role(User.Role.USER)
                .build();

        User saved = userService.create(user);

        return ResponseEntity.ok(
                UserResponseDto.builder()
                        .userId(saved.getUserId())
                        .username(saved.getUsername())
                        .email(saved.getEmail())
                        .nickname(saved.getNickname())
                        .role(saved.getRole())
                        .profileImage(saved.getProfileImage())
                        .intro(saved.getIntro())
                        .isActive(saved.getIsActive())
                        .createdAt(saved.getCreatedAt())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> get(@PathVariable Long id) {
        User user = userService.findById(id);

        return ResponseEntity.ok(
                UserResponseDto.builder()
                        .userId(user.getUserId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .nickname(user.getNickname())
                        .role(user.getRole())
                        .profileImage(user.getProfileImage())
                        .intro(user.getIntro())
                        .isActive(user.getIsActive())
                        .createdAt(user.getCreatedAt())
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> update(@PathVariable Long id,
                                                  @RequestBody UserUpdateRequestDto dto) {
        User updated = userService.update(id, User.builder()
                .nickname(dto.getNickname())
                .intro(dto.getIntro())
                .profileImage(dto.getProfileImage())
                .build());

        return ResponseEntity.ok(
                UserResponseDto.builder()
                        .userId(updated.getUserId())
                        .username(updated.getUsername())
                        .email(updated.getEmail())
                        .nickname(updated.getNickname())
                        .profileImage(updated.getProfileImage())
                        .intro(updated.getIntro())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // 일일 목표 페이지 설정/수정
    @PatchMapping("/{id}/daily-goal")
    public ResponseEntity<UserResponseDto> updateDailyGoal(
            @PathVariable Long id,
            @RequestParam Integer goalPages
    ) {
        User updated = userService.updateDailyPageGoal(id, goalPages);

        return ResponseEntity.ok(
                UserResponseDto.builder()
                        .userId(updated.getUserId())
                        .username(updated.getUsername())
                        .email(updated.getEmail())
                        .nickname(updated.getNickname())
                        .role(updated.getRole())
                        .profileImage(updated.getProfileImage())
                        .intro(updated.getIntro())
                        .isActive(updated.getIsActive())
                        .createdAt(updated.getCreatedAt())
                        .dailyPageGoal(updated.getDailyPageGoal())
                        .build()
        );
    }

    @GetMapping("/{userId}/daily-goal")
    public ResponseEntity<DailyGoalStatusDto> getDailyGoal(@PathVariable Long userId) {
        int targetPages = userService.findById(userId).getDailyPageGoal();
        int achievedPages = userService.getTodayPages(userId);

        DailyGoalStatusDto dto = DailyGoalStatusDto.builder()
                .targetPages(targetPages)
                .achievedPages(achievedPages)
                .goalAchieved(targetPages > 0 && achievedPages >= targetPages)
                .build();

        return ResponseEntity.ok(dto);
    }

    // ⭐ 오늘 읽은 페이지 + 목표 달성 체크 + 캘린더 저장 + JSON 반환
    @PatchMapping("/{userId}/today-pages")
    public ResponseEntity<ReadingProgressResponseDto> updateTodayPages(
            @PathVariable Long userId,
            @RequestParam Integer pagesRead
    ) {
        // ⭐ 오늘 기록 갱신 (오늘 누적 페이지 리턴)
        ReadingCalendar updated = readingCalendarService
                .updateDailyProgress(userId, LocalDate.now(), pagesRead);

        int updatedTodayPages = updated.getPagesRead() == null ? 0 : updated.getPagesRead();

        // ⭐ 목표 페이지 가져오기 (숫자로 반환한다고 했으므로)
        int dailyGoal = userRepo.findById(userId)
                .map(User::getDailyPageGoal)
                .orElse(0);

        // ⭐ 목표 달성 여부 체크 (원하면 추가 동작 가능)
        boolean goalReached = (dailyGoal > 0 && updatedTodayPages >= dailyGoal);

        // 👇 프론트가 그대로 setGoalData(res.data) 사용 가능
        ReadingProgressResponseDto response =
                new ReadingProgressResponseDto(dailyGoal, updatedTodayPages);

        return ResponseEntity.ok(response);
    }


    // 오늘 읽은 페이지 조회 (GET)
    @GetMapping("/{userId}/today-pages")
    public ResponseEntity<Integer> getTodayPages(@PathVariable Long userId) {

        int pagesReadToday = readingCalendarService
                .findByUserAndDate(userId, LocalDate.now())
                .map(c -> c.getPagesRead() == null ? 0 : c.getPagesRead())
                .orElse(0);

        return ResponseEntity.ok(pagesReadToday);
    }

    // 아이디 + 이메일로 비밀번호 재설정
    @PatchMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequestDto dto) {

        boolean success = userService.resetPassword(dto.getUsername(), dto.getEmail(), dto.getNewPassword());

        if (!success) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("아이디 또는 이메일이 일치하지 않습니다.");
        }

        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }


}
package java.starbooks.src.main.java.com.starbooks.controller;

import com.starbooks.entity.Challenge;
import com.starbooks.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping
    public ResponseEntity<?> createChallenge(@RequestBody Challenge challenge) {
        return ResponseEntity.ok(challengeService.save(challenge));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getChallenge(@PathVariable Long id) {
        Optional<Challenge> challenge = challengeService.findById(id);
        return challenge.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

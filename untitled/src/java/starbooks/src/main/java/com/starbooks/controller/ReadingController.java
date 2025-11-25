package java.starbooks.src.main.java.com.starbooks.controller;

import com.starbooks.entity.ReadingRecord;
import com.starbooks.service.ReadingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/reading")
@RequiredArgsConstructor
public class ReadingController {

    private final ReadingService readingService;

    @PostMapping
    public ResponseEntity<?> createRecord(@RequestBody ReadingRecord record) {
        return ResponseEntity.ok(readingService.save(record));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRecord(@PathVariable Long id) {
        Optional<ReadingRecord> record = readingService.findById(id);
        return record.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

package com.starbooks.domain.reading;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "reading_calendar",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_user_date",
                        columnNames = {"user_id", "reading_date"})
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_id")
    private Long calendarId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "reading_date", nullable = false)
    private LocalDate readingDate;

    @Column(name = "pages_read")
    private Integer pagesRead;

    @Column(name = "goal_achieved", columnDefinition = "TINYINT(1)")
    private Boolean goalAchieved;

    @Column(name = "progress_note", length = 255)
    private String progressNote;
}

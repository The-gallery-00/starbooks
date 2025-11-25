package com.starbooks.domain.goal;

import jakarta.persistence.*;
import lombok.*;
import com.starbooks.domain.user.User;


import java.time.LocalDate;

@Entity
@Table(name="reading_calendar")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calendarId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private LocalDate readingDate;

    private Integer pagesRead;

    private Boolean goalAchieved;

    private String progressNote;
}

package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "reading_calendar")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class ReadingCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calendarId;

    private String userId;

    private LocalDate date;

    private Integer progress; // reading percentage or pages
}

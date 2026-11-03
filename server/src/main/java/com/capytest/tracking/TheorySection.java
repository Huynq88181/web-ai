package com.capytest.tracking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TheorySection {
    @Id @GeneratedValue private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
    private int sortOrder;
    private String heading;
    @Column(length = 4000) private String body;

    protected TheorySection() {}

    public TheorySection(Lesson lesson, int sortOrder, String heading, String body) {
        this.lesson = lesson;
        this.sortOrder = sortOrder;
        this.heading = heading;
        this.body = body;
    }

    public String getHeading() { return heading; }
    public String getBody() { return body; }
}

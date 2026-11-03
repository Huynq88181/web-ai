package com.capytest.tracking;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Phase {
    @Id @GeneratedValue private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id")
    private Course course;
    private int sortOrder;
    private String title;
    private String timeLabel;
    @Column(length = 1000) private String summary;
    @Column(length = 1000) private String practice;
    @Column(length = 500) private String outcome;
    @OneToMany(mappedBy = "phase", cascade = CascadeType.ALL)
    @OrderBy("sortOrder")
    private List<Lesson> lessons = new ArrayList<>();

    protected Phase() {}

    public Phase(Course course, int sortOrder, String title, String timeLabel, String summary,
                 String practice, String outcome) {
        this.course = course;
        this.sortOrder = sortOrder;
        this.title = title;
        this.timeLabel = timeLabel;
        this.summary = summary;
        this.practice = practice;
        this.outcome = outcome;
    }

    public Long getId() { return id; }
    public int getSortOrder() { return sortOrder; }
    public String getTitle() { return title; }
    public String getTimeLabel() { return timeLabel; }
    public String getSummary() { return summary; }
    public String getPractice() { return practice; }
    public String getOutcome() { return outcome; }
    public List<Lesson> getLessons() { return lessons; }
}

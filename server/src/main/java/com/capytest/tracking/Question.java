package com.capytest.tracking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Question {
    @Id @GeneratedValue private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
    private int sortOrder;
    @Column(length = 500) private String question;
    @Column(length = 4000) private String answer;

    protected Question() {}

    public Question(Lesson lesson, int sortOrder, String question, String answer) {
        this.lesson = lesson;
        this.sortOrder = sortOrder;
        this.question = question;
        this.answer = answer;
    }

    public Long getId() { return id; }
    public String getQuestion() { return question; }
    public String getAnswer() { return answer; }
}

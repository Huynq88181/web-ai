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
public class Lesson {
    @Id @GeneratedValue private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phase_id")
    private Phase phase;
    private int sortOrder;
    private String title;
    @Column(length = 2000) private String example;
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    @OrderBy("sortOrder")
    private List<TheorySection> sections = new ArrayList<>();
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    @OrderBy("sortOrder")
    private List<Question> questions = new ArrayList<>();

    protected Lesson() {}

    public Lesson(Phase phase, int sortOrder, String title, String example) {
        this.phase = phase;
        this.sortOrder = sortOrder;
        this.title = title;
        this.example = example;
    }

    public Long getId() { return id; }
    public Phase getPhase() { return phase; }
    public int getSortOrder() { return sortOrder; }
    public String getTitle() { return title; }
    public String getExample() { return example; }
    public List<TheorySection> getSections() { return sections; }
    public List<Question> getQuestions() { return questions; }
}

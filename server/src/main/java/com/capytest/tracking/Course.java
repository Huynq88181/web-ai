package com.capytest.tracking;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {
    @Id @GeneratedValue private Long id;
    private String title;
    @Column(length = 2000) private String description;
    private int durationWeeks;
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @OrderBy("sortOrder")
    private List<Phase> phases = new ArrayList<>();

    protected Course() {}

    public Course(String title, String description, int durationWeeks) {
        this.title = title;
        this.description = description;
        this.durationWeeks = durationWeeks;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public int getDurationWeeks() { return durationWeeks; }
    public List<Phase> getPhases() { return phases; }
}

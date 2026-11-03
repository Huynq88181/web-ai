package com.capytest.tracking;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@Transactional(readOnly = true)
public class CourseController {

    record CourseSummary(Long id, String title, String description, int durationWeeks, int phaseCount, int lessonCount) {}
    record LessonRef(Long id, int order, String title) {}
    record PhaseView(Long id, int order, String title, String timeLabel, String summary, String practice,
                     String outcome, List<LessonRef> lessons) {}
    record CourseView(Long id, String title, String description, int durationWeeks, List<PhaseView> phases) {}
    record TheoryView(String heading, String body) {}
    record QuestionView(Long id, String question, String answer) {}
    record LessonView(Long id, String title, String phase, String example, List<TheoryView> theory,
                      List<QuestionView> questions) {}

    private final CourseRepository courses;
    private final LessonRepository lessons;

    CourseController(CourseRepository courses, LessonRepository lessons) {
        this.courses = courses;
        this.lessons = lessons;
    }

    @GetMapping("/courses")
    List<CourseSummary> list() {
        return courses.findAll().stream().map(c -> new CourseSummary(c.getId(), c.getTitle(), c.getDescription(),
            c.getDurationWeeks(), c.getPhases().size(),
            c.getPhases().stream().mapToInt(p -> p.getLessons().size()).sum())).toList();
    }

    @GetMapping("/courses/{id}")
    CourseView course(@PathVariable Long id) {
        Course c = courses.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return new CourseView(c.getId(), c.getTitle(), c.getDescription(), c.getDurationWeeks(),
            c.getPhases().stream().map(p -> new PhaseView(p.getId(), p.getSortOrder(), p.getTitle(), p.getTimeLabel(),
                p.getSummary(), p.getPractice(), p.getOutcome(),
                p.getLessons().stream().map(l -> new LessonRef(l.getId(), l.getSortOrder(), l.getTitle())).toList())).toList());
    }

    @GetMapping("/lessons/{id}")
    LessonView lesson(@PathVariable Long id) {
        Lesson l = lessons.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return new LessonView(l.getId(), l.getTitle(), l.getPhase().getTitle(), l.getExample(),
            l.getSections().stream().map(s -> new TheoryView(s.getHeading(), s.getBody())).toList(),
            l.getQuestions().stream().map(q -> new QuestionView(q.getId(), q.getQuestion(), q.getAnswer())).toList());
    }
}

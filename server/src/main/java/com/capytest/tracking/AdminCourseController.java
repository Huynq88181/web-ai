package com.capytest.tracking;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin")
@Transactional
public class AdminCourseController {

    record NewCourse(@NotBlank @Size(max = 200) String title, @Size(max = 2000) String description,
                     @Min(1) @Max(52) int durationWeeks) {}
    record NewQuestion(@NotBlank @Size(max = 500) String question, @NotBlank @Size(max = 4000) String answer) {}
    record Created(Long id) {}

    private final CourseRepository courses;
    private final LessonRepository lessons;
    private final AdminAuth auth;

    AdminCourseController(CourseRepository courses, LessonRepository lessons, AdminAuth auth) {
        this.courses = courses;
        this.lessons = lessons;
        this.auth = auth;
    }

    @PostMapping("/courses")
    @ResponseStatus(HttpStatus.CREATED)
    Created createCourse(@RequestHeader(value = "X-Admin-Token", required = false) String token,
                         @Valid @RequestBody NewCourse r) {
        auth.check(token);
        return new Created(courses.save(new Course(r.title(), r.description(), r.durationWeeks())).getId());
    }

    @PostMapping("/lessons/{lessonId}/questions")
    @ResponseStatus(HttpStatus.CREATED)
    Created addQuestion(@RequestHeader(value = "X-Admin-Token", required = false) String token,
                        @PathVariable Long lessonId, @Valid @RequestBody NewQuestion r) {
        auth.check(token);
        Lesson l = lessons.findById(lessonId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Question q = new Question(l, l.getQuestions().size() + 1, r.question(), r.answer());
        l.getQuestions().add(q);
        lessons.flush();
        return new Created(q.getId());
    }
}

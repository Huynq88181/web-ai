package com.capytest.tracking;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.json.JsonMapper;

// Nạp khoá học mẫu từ seed/course.json khi bảng course còn trống.
@Component
class CourseSeeder implements CommandLineRunner {

    record SeedLesson(String title, String example, List<List<String>> theory, List<List<String>> qa) {}
    record SeedPhase(String title, String timeLabel, String summary, String practice, String outcome,
                     List<SeedLesson> lessons) {}
    record Seed(String title, String description, int durationWeeks, List<SeedPhase> phases) {}

    private final CourseRepository courses;

    CourseSeeder(CourseRepository courses) {
        this.courses = courses;
    }

    @Override
    @Transactional
    public void run(String... args) throws IOException {
        if (courses.count() > 0) return;
        Seed seed;
        try (InputStream in = new ClassPathResource("seed/course.json").getInputStream()) {
            seed = JsonMapper.builder().build().readValue(in, Seed.class);
        }
        Course c = new Course(seed.title(), seed.description(), seed.durationWeeks());
        int pi = 1;
        for (SeedPhase sp : seed.phases()) {
            Phase p = new Phase(c, pi++, sp.title(), sp.timeLabel(), sp.summary(), sp.practice(), sp.outcome());
            c.getPhases().add(p);
            int li = 1;
            for (SeedLesson sl : sp.lessons()) {
                Lesson l = new Lesson(p, li++, sl.title(), sl.example());
                p.getLessons().add(l);
                int ti = 1;
                for (List<String> t : sl.theory()) l.getSections().add(new TheorySection(l, ti++, t.get(0), t.get(1)));
                int qi = 1;
                for (List<String> q : sl.qa()) l.getQuestions().add(new Question(l, qi++, q.get(0), q.get(1)));
            }
        }
        courses.save(c);
    }
}

package com.capytest.tracking;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {"app.admin-token=secret", "spring.datasource.url=jdbc:h2:mem:test"})
class TrackingApplicationTests {

    @Autowired TrackController track;
    @Autowired StatsController stats;
    @Autowired EventRepository events;
    @Autowired CourseController courseApi;
    @Autowired AdminCourseController adminApi;

    @Test
    void savesEventAndCountsIt() {
        events.deleteAll();
        var req = new org.springframework.mock.web.MockHttpServletRequest();
        req.addHeader("User-Agent", "Mozilla/5.0");
        track.track(new TrackController.TrackRequest("v1", "s1", "page_view", "/", null, null), req);
        track.track(new TrackController.TrackRequest("v1", "s1", "open_lesson", "/", "Bài A", "Bài A"), req);
        // bot bị bỏ qua
        var bot = new org.springframework.mock.web.MockHttpServletRequest();
        bot.addHeader("User-Agent", "Googlebot");
        track.track(new TrackController.TrackRequest("v2", "s2", "page_view", "/", null, null), bot);

        var s = stats.stats("secret");
        assertEquals(1, s.totalViews());
        assertEquals(1, s.totalVisitors());
        assertEquals("Bài A", s.topLessons().get(0).key());
    }

    @Test
    void seededCourseIsReadable() {
        // adminWritesNeedToken có thể đã thêm khoá khác, nên chọn đúng khoá mẫu.
        var seeded = courseApi.list().stream().filter(c -> c.phaseCount() == 6).findFirst().orElseThrow();
        assertEquals(24, seeded.lessonCount());
        var course = courseApi.course(seeded.id());
        var lessonId = course.phases().get(0).lessons().get(0).id();
        var lesson = courseApi.lesson(lessonId);
        assertEquals(true, lesson.questions().size() >= 10);
        assertEquals(true, !lesson.theory().isEmpty());
    }

    @Test
    void adminWritesNeedToken() {
        var body = new AdminCourseController.NewCourse("Khoá mới", null, 2);
        org.junit.jupiter.api.Assertions.assertThrows(org.springframework.web.server.ResponseStatusException.class,
            () -> adminApi.createCourse("sai", body));
        assertEquals(true, adminApi.createCourse("secret", body).id() != null);
    }
}

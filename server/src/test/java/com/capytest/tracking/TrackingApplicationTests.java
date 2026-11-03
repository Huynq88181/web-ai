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
}

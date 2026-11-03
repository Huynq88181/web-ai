package com.capytest.tracking;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin")
public class StatsController {

    record Day(LocalDate date, long views, long visitors) {}

    record Stats(long totalViews, long totalVisitors, List<Day> last14Days,
                 List<EventRepository.Count> topLessons, List<EventRepository.Count> topPhases) {}

    private final EventRepository events;
    private final String adminToken;

    StatsController(EventRepository events, @Value("${app.admin-token}") String adminToken) {
        this.events = events;
        this.adminToken = adminToken;
    }

    @GetMapping("/stats")
    Stats stats(@RequestHeader(value = "X-Admin-Token", required = false) String token) {
        // Token rỗng nghĩa là chưa cấu hình: từ chối tất cả thay vì để mở.
        if (adminToken.isBlank() || token == null
            || !MessageDigest.isEqual(adminToken.getBytes(StandardCharsets.UTF_8), token.getBytes(StandardCharsets.UTF_8))) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        Instant since = Instant.now().minus(14, ChronoUnit.DAYS);
        // shortcut: gom theo ngày bằng Java, đủ cho vài chục nghìn dòng; chuyển sang GROUP BY khi dữ liệu lớn.
        Map<LocalDate, Set<String>> visitors = new TreeMap<>();
        Map<LocalDate, Long> views = new TreeMap<>();
        for (Event e : events.viewsSince(since)) {
            LocalDate d = e.getCreatedAt().atZone(ZoneOffset.UTC).toLocalDate();
            views.merge(d, 1L, Long::sum);
            visitors.computeIfAbsent(d, k -> new HashSet<>()).add(e.getVisitorId());
        }
        List<Day> days = views.entrySet().stream()
            .map(en -> new Day(en.getKey(), en.getValue(), visitors.get(en.getKey()).size())).toList();
        PageRequest top10 = PageRequest.of(0, 10);
        return new Stats(events.countViews(), events.countVisitors(), days,
            events.topPayloads("open_lesson", top10), events.topPayloads("open_phase", top10));
    }
}

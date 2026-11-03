package com.capytest.tracking;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TrackController {

    // Chỉ nhận loại sự kiện đã biết để không bị bơm rác vào bảng.
    record TrackRequest(
        @NotBlank @Size(max = 64) String visitorId,
        @Size(max = 64) String sessionId,
        @NotBlank @Pattern(regexp = "page_view|open_phase|open_lesson|copy_prompt|click_cta") String type,
        @Size(max = 200) String path,
        @Size(max = 300) String referrer,
        @Size(max = 500) String payload) {}

    private final EventRepository events;
    private final String ipSalt;

    TrackController(EventRepository events, @Value("${app.ip-salt}") String ipSalt) {
        this.events = events;
        this.ipSalt = ipSalt;
    }

    @PostMapping("/track")
    ResponseEntity<Void> track(@Valid @RequestBody TrackRequest r, HttpServletRequest req) {
        String ua = req.getHeader("User-Agent");
        if (ua == null || ua.toLowerCase().contains("bot")) {
            return ResponseEntity.noContent().build(); // bỏ qua bot, không báo lỗi
        }
        events.save(new Event(r.visitorId(), r.sessionId(), r.type(), r.path(), r.referrer(),
            r.payload(), ua.length() > 300 ? ua.substring(0, 300) : ua, hashIp(clientIp(req))));
        return ResponseEntity.noContent().build();
    }

    // shortcut: tin X-Forwarded-For vô điều kiện, cần cấu hình proxy tin cậy khi lên production.
    private static String clientIp(HttpServletRequest req) {
        String xff = req.getHeader("X-Forwarded-For");
        return xff != null && !xff.isBlank() ? xff.split(",")[0].trim() : req.getRemoteAddr();
    }

    // Chỉ lưu bản băm có muối, không lưu IP thô.
    private String hashIp(String ip) {
        try {
            byte[] d = MessageDigest.getInstance("SHA-256").digest((ipSalt + ip).getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(d).substring(0, 32);
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }
}

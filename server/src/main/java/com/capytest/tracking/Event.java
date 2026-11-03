package com.capytest.tracking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "event", indexes = {
    @Index(columnList = "type,createdAt"),
    @Index(columnList = "visitorId")
})
public class Event {
    @Id
    @GeneratedValue
    private Long id;
    private String visitorId;
    private String sessionId;
    private String type;
    private String path;
    private String referrer;
    @Column(length = 500)
    private String payload;
    @Column(length = 300)
    private String userAgent;
    private String ipHash;
    private Instant createdAt = Instant.now();

    public Event() {}

    public Event(String visitorId, String sessionId, String type, String path, String referrer,
                 String payload, String userAgent, String ipHash) {
        this.visitorId = visitorId;
        this.sessionId = sessionId;
        this.type = type;
        this.path = path;
        this.referrer = referrer;
        this.payload = payload;
        this.userAgent = userAgent;
        this.ipHash = ipHash;
    }

    public String getVisitorId() { return visitorId; }
    public Instant getCreatedAt() { return createdAt; }
}

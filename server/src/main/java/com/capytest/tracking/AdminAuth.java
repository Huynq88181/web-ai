package com.capytest.tracking;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
class AdminAuth {
    private final String adminToken;

    AdminAuth(@Value("${app.admin-token}") String adminToken) {
        this.adminToken = adminToken;
    }

    // Token rỗng nghĩa là chưa cấu hình: từ chối tất cả thay vì để mở.
    void check(String token) {
        if (adminToken.isBlank() || token == null
            || !MessageDigest.isEqual(adminToken.getBytes(StandardCharsets.UTF_8), token.getBytes(StandardCharsets.UTF_8))) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}

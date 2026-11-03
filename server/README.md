# Tracking server

Spring Boot (Java 17) ghi lại lượt truy cập trang CapyTest.

- Chạy dev: `ADMIN_TOKEN=doi-token ./mvnw spring-boot:run` (H2 lưu ở `./data`, cổng 8080)
- Test: `./mvnw test`
- `POST /api/track` body: `{visitorId, sessionId?, type, path?, referrer?, payload?}`, type: `page_view | open_phase | open_lesson | copy_prompt | click_cta`
- `GET /api/admin/stats` cần header `X-Admin-Token`
- Production: `SPRING_PROFILES_ACTIVE=prod` và `DATABASE_URL` (vd `jdbc:postgresql://host/db`), `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `ALLOWED_ORIGINS`, `IP_SALT`, `ADMIN_TOKEN`

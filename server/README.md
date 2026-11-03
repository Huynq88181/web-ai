# Tracking server

Spring Boot (Java 17) ghi lại lượt truy cập trang CapyTest.

- Chạy dev: `ADMIN_TOKEN=doi-token ./mvnw spring-boot:run` (H2 lưu ở `./data`, cổng 8080)
- Test: `./mvnw test`
- `POST /api/track` body: `{visitorId, sessionId?, type, path?, referrer?, payload?}`, type: `page_view | open_phase | open_lesson | copy_prompt | click_cta`
- `GET /api/admin/stats` cần header `X-Admin-Token`
- Production: `SPRING_PROFILES_ACTIVE=prod` và `DATABASE_URL` (vd `jdbc:postgresql://host/db`), `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `ALLOWED_ORIGINS`, `IP_SALT`, `ADMIN_TOKEN`

## API khoá học
- `GET /api/courses`: danh sách khoá học
- `GET /api/courses/{id}`: khoá học kèm các chặng và bài học
- `GET /api/lessons/{id}`: lý thuyết, ví dụ và câu hỏi phỏng vấn của một bài
- `POST /api/admin/courses` (cần `X-Admin-Token`): tạo khoá học `{title, description, durationWeeks}`
- `POST /api/admin/lessons/{id}/questions` (cần `X-Admin-Token`): thêm câu hỏi `{question, answer}`

Bảng: `course`, `phase`, `lesson`, `theory_section`, `question`. Lần chạy đầu, nếu bảng `course` trống, server nạp dữ liệu mẫu từ `src/main/resources/seed/course.json`.

# Kiểu dáng và design token

Quy ước UI xem [UI_SPEC.md](../../docs/UI_SPEC.md). Hiện dùng Ant Design 6.

| Đường dẫn | Công dụng |
|---|---|
| theme/default.js | Màu, kích thước và antdTheme dùng cho ConfigProvider |
| theme/index.js | Xuất theme mặc định |
| tokens.scss | Token SCSS và mixin status-banner |
| antd-overrides.scss | Class tiện ích (nền trang, văn bản phụ) |

Truyền antdTheme vào ConfigProvider. Component AntD cấu hình bo góc, header bảng và màu ngữ nghĩa qua token. Khi chỉnh theme, đồng bộ default.js và tokens.scss.

Inter dùng dependency `@fontsource/inter`, font dự phòng là font hệ thống.

# Quy ước thiết kế UI

> Khi có chênh lệch, lấy tài liệu này cùng [`src/styles/theme/default.js`](../src/styles/theme/default.js) / [`src/styles/tokens.scss`](../src/styles/tokens.scss) làm chuẩn.

## Phạm vi áp dụng

Áp dụng cho **mọi trang mới, style component và thay đổi liên quan đến giao diện**.

---

## 1. Font chữ

| Hạng mục | Quy ước |
|------|------|
| Font family | **Inter** (dự phòng là bộ font UI của hệ thống) |

---

## 2. Màu sắc

### 2.1 Màu thương hiệu

| Loại | Hex | SCSS / JS |
|------|-----|-----------|
| Màu chính Primary | `#141DD2` | `$color-primary` / `$primary_color` / `colors.primary` |

### 2.2 Màu ngữ nghĩa

| Loại | Hex | SCSS |
|------|-----|------|
| Thành công Success | `#00791E` | `$color-success` |
| Cảnh báo Warning | `#865900` | `$color-warning` |
| Lỗi Error | `#BB0916` | `$color-error` |

### 2.3 Màu nền

| Loại | Hex | SCSS |
|------|-----|------|
| Nền trang Page | `#F4F4F6` | `$color-bg-page` / `$content_bg` |
| Nền container Container | `#FFFFFF` | `$color-bg-container` |
| Nền thành công | `#DFF5E5` | `$color-bg-success` |
| Nền cảnh báo | `#F9EDD5` | `$color-bg-warning` |
| Nền lỗi | `#FFE9E3` | `$color-bg-error` |
| Nền nhạt của màu chính (vd. nút phụ) | `#E8E9FC` | `$color-primary-tint-bg` |
| Màu chính sáng (hiệu ứng, điểm nhấn) | `#8D92F5` | `$color-primary-light` / `colors.primaryLight` |

### 2.4 Màu văn bản

| Loại | Hex | SCSS |
|------|-----|------|
| Văn bản chính Primary | `#0F0F11` | `$color-text-primary` / `$lableTitle` |
| Văn bản phụ Secondary | `#7E8084` | `$color-text-secondary` / `$fontContent` |
| Vô hiệu hoá Disabled | `#ADAEB1` | `$color-text-disabled` |

### 2.5 Viền

| Loại | Hex | SCSS |
|------|-----|------|
| Mặc định Default | `#EEEEEF` | `$color-border` / `$border_color` |

**Trạng thái ngữ nghĩa phải dùng cặp màu chính và màu nền:**

| Trạng thái | Màu chính | Màu nền |
|------|------|--------|
| Success | `#00791E` | `#DFF5E5` |
| Warning | `#865900` | `#F9EDD5` |
| Error | `#BB0916` | `#FFE9E3` |

---

## 3. Bo góc và viền

| Hạng mục | Tiêu chuẩn |
|------|------|
| Bo góc Border radius | **8px**（`$radius-base`） |
| Độ rộng viền | **1px** |
| Kiểu viền | Nét liền Solid |

---

## 4. Kích thước nút

| Kích thước | Chiều cao | Ghi chú |
|------|------|------|
| Lớn Big | **36px** | `$btn-height-lg` |
| Nhỏ Small | **32px** | `$btn-height-sm` |

---

## 5. Quy ước dùng component

- Các component cơ bản như nút, input, dropdown, card, modal **mặc định bo góc 8px**.
- Viền mặc định: **1px solid `#EEEEEF`**.
- Ưu tiên dùng component **Ant Design 6**; theme cấu hình qua `ConfigProvider` (xem [`src/styles/README.md`](../src/styles/README.md)), class tiện ích ở [`src/styles/antd-overrides.scss`](../src/styles/antd-overrides.scss).
- Thông báo ngữ nghĩa (Alert…) dùng cặp **màu ngữ nghĩa + nền ngữ nghĩa** theo quy ước; SCSS có thể dùng `@include status-banner(success|warning|error)` (xem `tokens.scss`).

---

## 6. Áp dụng ở frontend

| Tình huống | Cách làm |
|------|------|
| Đổi màu thương hiệu/bo góc/font | Sửa [`src/styles/theme/default.js`](../src/styles/theme/default.js) trước, rồi đồng bộ [`src/styles/tokens.scss`](../src/styles/tokens.scss) và cập nhật bảng màu trong **tài liệu này** |
| SCSS | `@import 'styles/tokens.scss';`, dùng biến `$color-*` |
| Màu inline trong JSX | `import { colors } from '@/styles/theme'` |
| Theme Ant Design | `<ConfigProvider theme={antdTheme}>` |
| Class tiện ích | `.crm-page-bg`, `.crm-text-secondary` (xem `antd-overrides.scss`) |

Mô tả chi tiết thư mục xem [`src/styles/README.md`](../src/styles/README.md).

---

## 7. Tự kiểm tra khi thêm / sửa trang

Trước khi commit, xác nhận:

- [ ] Không hard-code màu trái quy ước (vd. literal `#141DD2` tuỳ tiện); dùng biến token hoặc `colors.*`.
- [ ] Form, nút, bảng… ưu tiên component Ant, giữ bo góc 8px.
- [ ] Nền cấp trang dùng `#F4F4F6`, card/container nội dung dùng `#FFFFFF`.
- [ ] SCSS mới nếu dùng màu/bo góc thì đã `@import` tokens.scss.
- [ ] Nếu sửa chính quy ước thiết kế, đã đồng bộ `UI_SPEC.md` và các file token.

---

## 8. Danh mục file liên quan

| File | Công dụng |
|------|------|
| [`src/styles/theme/default.js`](../src/styles/theme/default.js) | Theme JS (antdTheme, colors) |
| [`src/styles/tokens.scss`](../src/styles/tokens.scss) | Token SCSS |

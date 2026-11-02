export default {
  'Vòng đời bug, severity vs priority': {
    theory: [
      ['Vòng đời bug', `New → Assigned → In Progress → Fixed/Resolved → Ready for Retest → Verified → Closed. Nhánh khác: Reopened (retest vẫn lỗi), Rejected/Not a bug (dev cho rằng đúng thiết kế), Duplicate (trùng bug có sẵn), Deferred (hoãn bản sau), Cannot Reproduce (không tái hiện được).`],
      ['Severity – mức độ nghiêm trọng', `Mức ảnh hưởng của lỗi tới hệ thống, do tester đánh giá. Ví dụ: Critical (sập, mất dữ liệu, không thể dùng chức năng chính), Major (chức năng chính sai nhưng còn cách khác), Minor (lỗi nhỏ, có cách vòng), Trivial (lỗi hiển thị nhỏ, chính tả).`],
      ['Priority – độ ưu tiên', `Mức độ cần sửa sớm, thường do PO/PM quyết định dựa trên nghiệp vụ và thời hạn. Hai khái niệm độc lập: severity nói về kỹ thuật, priority nói về nghiệp vụ.`],
      ['Các tổ hợp điển hình', `Severity cao – priority thấp: app crash ở thiết bị rất cũ ít người dùng. Severity thấp – priority cao: sai tên công ty/logo trên trang chủ trước buổi ra mắt. Cao–cao: không thanh toán được. Thấp–thấp: lệch pixel ở trang ít dùng.`],
    ],
    example: `Nút “Thanh toán” báo lỗi 500 với mọi khách: Severity Critical, Priority High. Sai chính tả trên trang “Giới thiệu”: Severity Trivial, Priority Low; nhưng nếu nằm trên banner chiến dịch ngày mai thì Priority nâng lên High.`,
    qa: [
      ['Phân biệt severity và priority, cho ví dụ?', `Severity là mức độ ảnh hưởng kỹ thuật tới hệ thống, priority là mức độ cần sửa sớm theo nghiệp vụ. Ví dụ crash ở thiết bị hiếm gặp: severity cao, priority thấp; sai logo ngày ra mắt: severity thấp, priority cao.`],
      ['Dev bảo “không phải bug” thì bạn làm gì?', `Đối chiếu với yêu cầu/acceptance criteria và thiết kế. Nếu đúng yêu cầu thì có thể là thay đổi cần PO quyết định; nếu yêu cầu mơ hồ thì làm rõ với PO và cập nhật tài liệu, tránh tranh cãi cá nhân.`],
      ['Bug không tái hiện được xử lý thế nào?', `Cung cấp thêm thông tin: môi trường, dữ liệu, tần suất, log, video. Thử lại ở môi trường khác và ghi nhận tỷ lệ xảy ra; nếu vẫn không tái hiện thì để trạng thái theo dõi chứ không đóng vội.`],
    ],
  },
  'Viết bug report dễ tái hiện': {
    theory: [
      ['Các phần của bug report', `Tiêu đề ngắn nêu rõ lỗi và ngữ cảnh; môi trường (OS, trình duyệt, phiên bản build, tài khoản); các bước tái hiện đánh số; kết quả thực tế; kết quả mong đợi; tần suất; mức độ nghiêm trọng; tệp đính kèm (ảnh, video, log, HAR).`],
      ['Nguyên tắc', `Một bug một báo cáo. Bước tái hiện ngắn nhất có thể và không giả định kiến thức. Nêu sự thật, không đổ lỗi hay suy diễn. Tách rõ thực tế và mong đợi. Kiểm tra trùng trước khi tạo.`],
      ['Tiêu đề tốt', `Công thức: [Module] Hành vi sai khi điều kiện. Tốt: “[Giỏ hàng] Tổng tiền không cập nhật sau khi xoá sản phẩm cuối.” Xấu: “Giỏ hàng bị lỗi”.`],
    ],
    example: `Tiêu đề: [Đăng nhập] Không đăng nhập được bằng email có chữ in hoa. Môi trường: Chrome 130, macOS, build 1.4.2, staging. Bước: 1) mở /login; 2) nhập “User@Mail.com” và mật khẩu đúng; 3) bấm Đăng nhập. Thực tế: báo “Sai thông tin”. Mong đợi: đăng nhập thành công (email không phân biệt hoa thường). Tần suất: 5/5.`,
    qa: [
      ['Một bug report tốt cần có gì?', `Tiêu đề rõ, môi trường, các bước tái hiện, kết quả thực tế vs mong đợi, tần suất, mức độ nghiêm trọng và bằng chứng (ảnh, video, log).`],
      ['Tại sao một bug report nên chỉ nói về một lỗi?', `Dễ giao việc, theo dõi trạng thái và retest riêng. Gộp nhiều lỗi khiến một phần bị sót hoặc không thể đóng khi chỉ sửa một phần.`],
      ['Làm sao viết bug khiến dev dễ sửa?', `Cung cấp bước ngắn gọn tái hiện chắc chắn, dữ liệu cụ thể, log/console/network liên quan và tập trung nêu hiện tượng, không đoán nguyên nhân.`],
    ],
  },
  'Jira / công cụ quản lý test': {
    theory: [
      ['Jira cơ bản', `Issue types: Epic, Story, Task, Bug, Sub-task. Workflow: To Do → In Progress → In Review → In Test → Done (tuỳ dự án). Có board Scrum/Kanban, backlog, sprint, filter bằng JQL (ví dụ: project = APP AND type = Bug AND status != Done).`],
      ['Quản lý test case', `Jira thuần không có test case chuyên biệt; thường dùng plugin (Xray, Zephyr) hoặc công cụ riêng (TestRail) hoặc bảng tính. Các khái niệm chung: test case, test suite/test plan, test run/test cycle, kết quả (Pass/Fail/Blocked/Skipped) và liên kết bug.`],
      ['Quy tắc làm việc', `Liên kết bug với story và test case, cập nhật trạng thái kịp thời, gắn nhãn/component để lọc, mô tả đầy đủ khi đổi trạng thái, và dùng dashboard/báo cáo để xem tiến độ.`],
    ],
    example: `JQL tìm bug mở nghiêm trọng của sprint hiện tại: project = APP AND issuetype = Bug AND sprint in openSprints() AND priority in (High, Highest) AND status != Done ORDER BY priority DESC.`,
    qa: [
      ['Khác nhau giữa test plan, test suite, test run?', `Test plan là kế hoạch tổng (phạm vi, chiến lược, nguồn lực). Test suite là tập hợp test case cùng chủ đề. Test run/cycle là một lần thực thi test case trên một bản build cụ thể và ghi kết quả.`],
      ['Trạng thái Blocked nghĩa là gì?', `Test case không thể chạy do vật cản như bug chặn, thiếu môi trường hoặc dữ liệu. Cần ghi nguyên nhân và liên kết bug/yêu cầu để theo dõi.`],
      ['Bạn dùng JQL để làm gì?', `Lọc nhanh issue: bug chưa đóng của sprint, bug do mình tạo, bug sửa xong chờ retest… giúp theo dõi và báo cáo mà không phải tìm thủ công.`],
    ],
  },
  'Báo cáo kết quả test': {
    theory: [
      ['Nội dung báo cáo', `Phạm vi và bản build đã test; tổng số test case: Pass/Fail/Blocked/Not run; số bug theo mức độ và trạng thái; rủi ro còn lại; phần chưa test và lý do; khuyến nghị (phát hành hay không).`],
      ['Các chỉ số thường dùng', `Tỷ lệ pass = Pass / tổng đã chạy. Độ phủ test = test đã chạy / tổng kế hoạch. Mật độ bug = số bug / quy mô (module, KLOC). Defect leakage = bug lọt ra production / tổng bug. Số liệu chỉ có ý nghĩa khi đi kèm giải thích.`],
      ['Exit criteria', `Điều kiện kết thúc test, ví dụ: 100% ca P1 pass, không còn bug Critical/Major mở, tỷ lệ pass tổng ≥ 95%. Thoả điều kiện thì đề xuất phát hành, nếu không thì nêu rõ rủi ro.`],
    ],
    example: `Báo cáo sprint 5: kế hoạch 120 ca, đã chạy 112 (93%), pass 104 (93% đã chạy), fail 6, blocked 2. Bug: 9 mới (1 Critical đã sửa, 2 Major mở). Khuyến nghị: chưa phát hành tới khi 2 bug Major được sửa và retest.`,
    qa: [
      ['Báo cáo test gồm những gì?', `Phạm vi, bản build, số ca theo trạng thái, bug theo mức độ/trạng thái, rủi ro, phần chưa test và khuyến nghị phát hành.`],
      ['Defect leakage là gì?', `Tỷ lệ lỗi lọt ra production so với tổng lỗi tìm thấy; đo hiệu quả của quá trình test. Cao nghĩa là test chưa đủ hoặc chưa đúng vùng rủi ro.`],
      ['Khi pass rate 98% nhưng còn một bug Critical mở thì bạn đề xuất gì?', `Không phát hành. Chỉ số tổng không bù được bug nghiêm trọng; cần sửa và retest bug đó trước.`],
    ],
  },
  'Chrome DevTools cho tester': {
    theory: [
      ['Các tab chính', `Elements: xem/sửa DOM và CSS trực tiếp. Console: xem lỗi JavaScript, chạy lệnh. Network: xem request/response, status code, thời gian, header, payload. Application: cookie, localStorage, sessionStorage. Performance/Lighthouse: đo hiệu năng và chất lượng trang.`],
      ['Dùng khi test', `Network: xác nhận API trả đúng status/dữ liệu, chặn hoặc làm chậm mạng (Throttling/Offline) để test mạng yếu. Console: tìm lỗi đỏ khi thao tác. Elements: kiểm tra thuộc tính, sửa tạm để thử. Device toolbar: thử responsive. Application: xoá cookie để test hết phiên.`],
      ['Thu thập bằng chứng', `Đính kèm ảnh chụp console/network, xuất HAR hoặc copy cURL của request lỗi vào bug report để dev tái hiện nhanh.`],
    ],
    example: `Nút “Lưu” báo thành công nhưng dữ liệu không đổi: mở Network → thao tác → thấy request PUT /api/profile trả 400 với body {“error”:“name too long”}. Ghi vào bug: giao diện báo sai dù API lỗi, và nêu rõ request/response.`,
    qa: [
      ['Làm sao biết lỗi nằm ở frontend hay backend?', `Xem tab Network: nếu request không gửi hoặc payload sai thì nghi frontend; nếu request đúng mà response lỗi (4xx/5xx) hoặc dữ liệu sai thì nghi backend. Kết hợp Console để thấy lỗi JS.`],
      ['Test mạng chậm bằng cách nào?', `Trong Network chọn Throttling (Slow 3G/Offline) rồi thao tác để kiểm tra hiển thị loading, timeout và thông báo lỗi.`],
      ['Dữ liệu lưu ở trình duyệt xem ở đâu?', `Tab Application: Cookies, Local Storage, Session Storage, IndexedDB. Có thể xoá hoặc sửa để test các tình huống hết phiên.`],
    ],
  },
  'SQL cơ bản để kiểm tra dữ liệu': {
    theory: [
      ['Câu lệnh nền tảng', `SELECT cột FROM bảng WHERE điều kiện ORDER BY cột LIMIT n. Toán tử: =, <>, >, LIKE, IN, BETWEEN, IS NULL. Hàm tổng hợp: COUNT, SUM, AVG, MIN, MAX với GROUP BY và HAVING.`],
      ['JOIN', `INNER JOIN: chỉ lấy dòng khớp ở cả hai bảng. LEFT JOIN: lấy mọi dòng bảng trái, bảng phải không khớp thì NULL (hay dùng để tìm bản ghi “mồ côi”). Dùng JOIN để đối chiếu dữ liệu giữa các bảng như orders và customers.`],
      ['Dùng SQL khi test', `Kiểm tra dữ liệu sau thao tác trên giao diện/API có được ghi đúng; chuẩn bị hoặc dọn dữ liệu test; tìm dữ liệu trùng, thiếu, sai ràng buộc. Chỉ dùng SELECT trên môi trường thật; UPDATE/DELETE phải có WHERE và chạy ở môi trường test.`],
    ],
    example: `Sau khi đặt hàng trên giao diện: SELECT id, status, total FROM orders WHERE customer_email = 'a@x.com' ORDER BY created_at DESC LIMIT 1; Tìm đơn không có chi tiết: SELECT o.id FROM orders o LEFT JOIN order_items i ON i.order_id = o.id WHERE i.id IS NULL;`,
    qa: [
      ['INNER JOIN khác LEFT JOIN thế nào?', `INNER JOIN chỉ trả về dòng có khớp ở cả hai bảng. LEFT JOIN trả mọi dòng của bảng trái, phần không khớp ở bảng phải là NULL.`],
      ['WHERE khác HAVING?', `WHERE lọc dòng trước khi gom nhóm; HAVING lọc nhóm sau GROUP BY, thường dùng với hàm tổng hợp như COUNT.`],
      ['Làm sao tìm bản ghi trùng email?', `SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;`],
    ],
  },
  'Postman: request, assert, collection': {
    theory: [
      ['Request cơ bản', `Chọn method (GET, POST, PUT, PATCH, DELETE), URL, Headers (Content-Type, Authorization), Params, Body (raw JSON, form-data). Xem response: status, thời gian, body, headers.`],
      ['Biến và môi trường', `Dùng Environment (dev/staging/prod) với biến {{baseUrl}}, {{token}} để không lặp lại và dễ đổi môi trường. Biến có thể được gán từ response bằng script, ví dụ lưu token sau khi đăng nhập.`],
      ['Assert (Tests tab)', `Viết kiểm tra bằng JavaScript: pm.test('Status 200', () => pm.response.to.have.status(200)); const body = pm.response.json(); pm.expect(body.email).to.eql('a@x.com'). Nên kiểm tra status, schema/trường bắt buộc, giá trị chính và thời gian phản hồi.`],
      ['Collection và Runner', `Collection gom các request theo luồng, có thể chạy tuần tự bằng Collection Runner hoặc Newman (CLI) trong CI. Chia folder theo tính năng và dùng Pre-request script để chuẩn bị dữ liệu.`],
    ],
    example: `Luồng: POST /auth/login (test: 200, lưu {{token}}) → GET /me (header Authorization: Bearer {{token}}, test: email đúng) → POST /orders (test: 201, lưu orderId) → GET /orders/{{orderId}} (test: status = “NEW”).`,
    qa: [
      ['Làm sao truyền token từ request này sang request sau?', `Trong tab Tests của request đăng nhập lưu token vào biến: pm.environment.set('token', pm.response.json().token), các request sau dùng {{token}} trong header Authorization.`],
      ['Newman dùng để làm gì?', `Là công cụ dòng lệnh chạy Collection Postman, giúp tích hợp vào CI/CD để chạy API test tự động.`],
      ['Bạn assert những gì trong một API test?', `Status code, các trường bắt buộc và kiểu dữ liệu, giá trị nghiệp vụ chính, header quan trọng và thời gian phản hồi, cùng ca lỗi (dữ liệu sai trả 4xx với thông báo đúng).`],
    ],
  },
  'Kiểm thử REST API': {
    theory: [
      ['REST và status code', `REST dùng HTTP method theo hành động: GET đọc, POST tạo, PUT thay thế, PATCH sửa một phần, DELETE xoá. Status: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized (chưa xác thực), 403 Forbidden (không có quyền), 404 Not Found, 409 Conflict, 422 Unprocessable, 500 lỗi server.`],
      ['Cần kiểm tra gì', `Đúng status và body; validate đầu vào (thiếu trường, sai kiểu, quá dài); xác thực và phân quyền (không token, token hết hạn, người khác truy cập tài nguyên của mình); phân trang, lọc, sắp xếp; tính idempotent (PUT/DELETE gọi lại cho cùng kết quả); thời gian phản hồi; dữ liệu trong DB khớp.`],
      ['Test tiêu cực và bảo mật cơ bản', `Gửi JSON sai cú pháp, trường thừa, giá trị biên, ký tự đặc biệt; thử truy cập ID người khác (IDOR); kiểm tra không lộ thông tin nhạy cảm trong response hay thông báo lỗi.`],
    ],
    example: `POST /users thiếu email → mong đợi 400 với {“error”:“email is required”}. GET /orders/9999 (của người khác) với token của tôi → mong đợi 403 hoặc 404, không trả dữ liệu. Gọi DELETE /orders/5 hai lần → lần 1: 204; lần 2: 404, không lỗi 500.`,
    qa: [
      ['401 khác 403 thế nào?', `401: chưa xác thực hoặc token không hợp lệ. 403: đã xác thực nhưng không có quyền truy cập tài nguyên.`],
      ['PUT khác PATCH?', `PUT thay thế toàn bộ tài nguyên, PATCH cập nhật một phần. Cả hai nên idempotent trong thiết kế REST chuẩn.`],
      ['Bạn sẽ test API tạo đơn hàng những ca nào?', `Tạo thành công (201), thiếu/sai trường (400), sản phẩm hết hàng (409/422), không đăng nhập (401), không đủ quyền (403), số lượng biên (0, âm, rất lớn), gọi trùng lặp và kiểm tra dữ liệu trong DB.`],
    ],
  },
};

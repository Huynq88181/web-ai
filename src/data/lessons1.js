// Nội dung bài học: theory = [tiêu đề, nội dung][], qa = [câu hỏi, gợi ý trả lời][]
export default {
  'SDLC, STLC và vai trò tester': {
    theory: [
      ['SDLC là gì', `SDLC (Software Development Life Cycle) là vòng đời phát triển phần mềm: thu thập yêu cầu → thiết kế → lập trình → kiểm thử → triển khai → bảo trì. Mô hình phổ biến: Waterfall (tuần tự, test ở cuối), V-Model (mỗi giai đoạn phát triển có một giai đoạn test tương ứng) và Agile/Scrum (chia nhỏ theo sprint 1–4 tuần, test diễn ra liên tục trong sprint).`],
      ['STLC là gì', `STLC (Software Testing Life Cycle) là các bước riêng của hoạt động kiểm thử: (1) Phân tích yêu cầu, (2) Lập kế hoạch test, (3) Thiết kế test case, (4) Chuẩn bị môi trường và dữ liệu, (5) Thực thi test, (6) Đóng chu kỳ test và báo cáo. Mỗi bước có điều kiện vào (entry criteria) và điều kiện ra (exit criteria).`],
      ['Vai trò của tester', `Tester không chỉ “tìm bug”. Họ làm rõ yêu cầu, đánh giá rủi ro, thiết kế và thực thi test, báo cáo lỗi, đo chất lượng và đưa thông tin để nhóm ra quyết định phát hành. Tester giỏi tham gia từ lúc đọc yêu cầu (shift-left), không đợi tới khi có bản build.`],
      ['QA, QC và Testing', `QA (Quality Assurance) tập trung vào quy trình để phòng ngừa lỗi. QC (Quality Control) kiểm tra sản phẩm để phát hiện lỗi. Testing là một hoạt động của QC: thực thi phần mềm để tìm lỗi và đánh giá chất lượng.`],
    ],
    example: `Sprint 2 tuần: ngày 1–2 tester review user story và hỏi lại PO; ngày 3–5 viết test case song song lúc dev code; ngày 6–9 test từng story ngay khi dev bàn giao; ngày 10 regression và báo cáo trước buổi demo.`,
    qa: [
      ['Phân biệt SDLC và STLC?', `SDLC là toàn bộ vòng đời làm phần mềm, STLC là vòng đời của riêng hoạt động test nằm trong SDLC. STLC gồm phân tích yêu cầu, lập kế hoạch, thiết kế test case, chuẩn bị môi trường, thực thi và đóng chu kỳ.`],
      ['QA khác QC như thế nào?', `QA hướng quy trình và mang tính phòng ngừa (ví dụ xây quy trình review, chuẩn code). QC hướng sản phẩm và mang tính phát hiện (ví dụ chạy test, báo bug). Testing là một phần của QC.`],
      ['Trong Agile, tester làm gì khác Waterfall?', `Tester tham gia ngay từ đầu sprint, review story, viết test song song với dev, test liên tục và cộng tác trực tiếp với dev/PO thay vì chờ bàn giao cuối giai đoạn.`],
    ],
  },
  '7 nguyên tắc kiểm thử': {
    theory: [
      ['Bảy nguyên tắc (ISTQB)', `1) Testing cho thấy sự hiện diện của lỗi chứ không chứng minh không còn lỗi. 2) Không thể test toàn diện (exhaustive testing). 3) Test sớm tiết kiệm chi phí. 4) Lỗi thường tập trung ở một số module (defect clustering, quy tắc 80/20). 5) Nghịch lý thuốc trừ sâu: chạy mãi một bộ test sẽ không tìm thêm lỗi mới. 6) Test phụ thuộc ngữ cảnh. 7) Ảo tưởng “không lỗi”: phần mềm không bug nhưng không đáp ứng nhu cầu người dùng vẫn là thất bại.`],
      ['Hệ quả thực tế', `Vì không thể test hết nên phải chọn test theo rủi ro và độ ưu tiên. Vì test sớm rẻ hơn nên phải review yêu cầu trước khi code. Vì bộ test bị “chai” nên phải cập nhật test case định kỳ.`],
      ['Defect clustering', `Một vài module (thường là phức tạp, hay bị sửa, nhiều người đụng vào) chứa phần lớn bug. Tester nên dồn thêm công sức vào các khu vực này và dùng dữ liệu bug cũ để dự đoán.`],
    ],
    example: `Form đăng ký có 10 trường, mỗi trường 5 giá trị thử: tổ hợp là 5^10 ≈ 9,7 triệu ca. Không thể test hết, nên dùng kỹ thuật thiết kế test (chia lớp tương đương, giá trị biên) để chọn vài chục ca đại diện.`,
    qa: [
      ['Vì sao không thể test toàn diện?', `Số tổ hợp đầu vào, đường đi và môi trường gần như vô hạn. Thay vào đó ta dùng kỹ thuật thiết kế test và phân tích rủi ro để chọn tập test nhỏ nhưng có giá trị cao.`],
      ['“Nghịch lý thuốc trừ sâu” nghĩa là gì và xử lý ra sao?', `Chạy lặp một bộ test không đổi thì dần không phát hiện lỗi mới (như sâu bọ kháng thuốc). Cần xem lại và bổ sung test case, thêm exploratory testing và dữ liệu mới.`],
      ['Phần mềm không có bug thì có thể coi là thành công chưa?', `Chưa chắc. Theo nguyên tắc “ảo tưởng không lỗi”, nếu sản phẩm không đáp ứng nhu cầu thực của người dùng hoặc khó dùng thì vẫn thất bại dù ít bug.`],
    ],
  },
  'Các loại & mức độ test': {
    theory: [
      ['Bốn mức độ test', `Unit test (từng hàm/class, thường do dev viết), Integration test (các module/service tương tác với nhau), System test (toàn hệ thống theo yêu cầu), Acceptance test – UAT (người dùng/khách hàng xác nhận sản phẩm đáp ứng nhu cầu).`],
      ['Functional và Non-functional', `Functional test kiểm tra “hệ thống làm gì” theo chức năng. Non-functional kiểm tra “làm tốt đến đâu”: hiệu năng (performance), bảo mật (security), khả dụng (usability), tương thích (compatibility), độ tin cậy.`],
      ['Smoke, Sanity, Regression', `Smoke: kiểm tra nhanh các chức năng sống còn xem bản build có đủ ổn để test tiếp không. Sanity: kiểm tra hẹp và sâu sau khi sửa lỗi hoặc thay đổi nhỏ. Regression: chạy lại các test cũ để chắc chắn thay đổi mới không làm hỏng chức năng cũ.`],
      ['Black-box, White-box, Grey-box', `Black-box: test dựa trên đầu vào/đầu ra, không cần biết code. White-box: dựa vào cấu trúc code (độ phủ câu lệnh, nhánh). Grey-box: biết một phần cấu trúc bên trong, ví dụ biết schema DB khi test API.`],
      ['Manual và Automation', `Manual phù hợp với exploratory, usability, ca chạy một lần. Automation phù hợp ca lặp lại nhiều (regression), ổn định, tốn nhiều dữ liệu. Không nên tự động hoá mọi thứ.`],
    ],
    example: `Nhận bản build mới của app bán hàng: chạy smoke (mở app, đăng nhập, xem sản phẩm, thêm giỏ hàng, thanh toán thử). Smoke đạt mới tiếp tục test chi tiết từng story; cuối sprint chạy regression bộ ca cốt lõi.`,
    qa: [
      ['Smoke test khác sanity test thế nào?', `Smoke rộng và nông, chạy trên bản build mới để quyết định có test tiếp hay không. Sanity hẹp và sâu, chạy sau khi sửa lỗi hoặc đổi nhỏ để xác nhận phần thay đổi hoạt động đúng.`],
      ['Khi nào cần regression test?', `Mỗi lần có thay đổi: sửa bug, thêm tính năng, cập nhật thư viện hoặc cấu hình. Regression bảo vệ chức năng cũ không bị vỡ và là ứng viên số một để tự động hoá.`],
      ['Black-box và white-box khác nhau chỗ nào?', `Black-box test theo hành vi bên ngoài, không cần code. White-box dựa vào cấu trúc code và đo độ phủ. Tester manual chủ yếu dùng black-box.`],
      ['Functional và non-functional test ví dụ?', `Functional: đăng nhập đúng/sai, tạo đơn hàng. Non-functional: 500 người dùng cùng lúc mà trang vẫn tải dưới 2 giây, mật khẩu được mã hoá, hiển thị đúng trên Safari.`],
    ],
  },
  'Đọc hiểu yêu cầu / user story': {
    theory: [
      ['User story', `Định dạng: “Là <vai trò>, tôi muốn <việc cần làm> để <lợi ích>.” Kèm theo là Acceptance Criteria (tiêu chí chấp nhận) viết dạng Given–When–Then. Ví dụ: Given tôi đã đăng ký, When tôi nhập đúng email và mật khẩu, Then tôi vào trang chủ.`],
      ['Cách đọc yêu cầu như tester', `Đọc và gạch chân: ai làm (actor), làm gì (hành động), điều kiện (khi nào), dữ liệu (định dạng, giới hạn), kết quả (thành công/lỗi). Tự hỏi: trường hợp ngoại lệ là gì? Dữ liệu rỗng, quá dài, sai định dạng thì sao? Ai có quyền? Có ảnh hưởng chức năng khác không?`],
      ['Dấu hiệu yêu cầu mơ hồ', `Từ không đo được như “nhanh”, “thân thiện”, “nhiều”; thiếu giá trị cụ thể (tối đa bao nhiêu ký tự?); thiếu thông báo lỗi; thiếu quy tắc nghiệp vụ; mâu thuẫn giữa các tài liệu. Mỗi điểm mơ hồ phải thành một câu hỏi gửi PO/BA.`],
      ['INVEST', `Story tốt thỏa INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable. Nếu không testable (không thể kiểm tra đạt hay chưa) thì phải làm rõ tiêu chí.`],
    ],
    example: `Story: “Là khách hàng, tôi muốn đặt lại mật khẩu để vào lại tài khoản.” Câu hỏi của tester: link đặt lại hết hạn sau bao lâu? Dùng lại link cũ được không? Mật khẩu mới có phải khác mật khẩu cũ? Email không tồn tại thì báo gì (lưu ý lộ thông tin người dùng)?`,
    qa: [
      ['Bạn làm gì khi nhận yêu cầu thiếu thông tin?', `Liệt kê các điểm chưa rõ thành câu hỏi cụ thể, gửi cho PO/BA, ghi lại câu trả lời vào story và cập nhật tiêu chí chấp nhận. Không tự đoán rồi test theo suy đoán.`],
      ['Acceptance criteria là gì, viết thế nào?', `Là các điều kiện để story được coi là hoàn thành, nên đo được và kiểm chứng được. Dạng Given–When–Then giúp chuyển thẳng thành test case.`],
      ['Làm sao phát hiện lỗi từ giai đoạn yêu cầu?', `Review yêu cầu tìm chỗ mâu thuẫn, thiếu, mơ hồ, không test được; đối chiếu các tài liệu; hỏi các trường hợp biên và ngoại lệ. Lỗi phát hiện ở bước này rẻ nhất để sửa.`],
    ],
  },
  'Equivalence Partitioning & Boundary Value': {
    theory: [
      ['Equivalence Partitioning (EP) – chia lớp tương đương', `Chia miền đầu vào thành các lớp mà hệ thống xử lý giống nhau, rồi chỉ cần test một giá trị đại diện cho mỗi lớp. Có lớp hợp lệ và lớp không hợp lệ. Giúp giảm số test mà vẫn phủ đủ hành vi.`],
      ['Boundary Value Analysis (BVA) – giá trị biên', `Lỗi hay xuất hiện ở biên của lớp. Với khoảng [min, max], test các giá trị: min−1, min, min+1, max−1, max, max+1. Đây là kỹ thuật bổ trợ cho EP.`],
      ['Cách áp dụng', `Bước 1: xác định các điều kiện đầu vào. Bước 2: chia lớp hợp lệ/không hợp lệ. Bước 3: chọn đại diện cho từng lớp. Bước 4: thêm giá trị biên. Bước 5: ghép thành test case, mỗi test case chỉ chứa một giá trị không hợp lệ để dễ xác định nguyên nhân.`],
    ],
    example: `Trường “Tuổi” hợp lệ từ 18 đến 60. EP: lớp <18 (không hợp lệ), 18–60 (hợp lệ), >60 (không hợp lệ), cộng thêm lớp phi số/rỗng. Đại diện: 10, 30, 70, “abc”, rỗng. BVA: 17, 18, 19, 59, 60, 61. Tổng chỉ ~10 ca thay vì thử mọi tuổi.`,
    qa: [
      ['Giá trị biên của khoảng 1–100 là gì?', `0, 1, 2, 99, 100, 101. Nếu biên là kiểu số nguyên thì đó là 6 giá trị cần test.`],
      ['Vì sao phải kết hợp EP và BVA?', `EP giảm số lượng test bằng cách chọn đại diện, còn BVA nhắm vào các điểm dễ sai nhất (lỗi so sánh “<” thay vì “<=”). Dùng cả hai vừa gọn vừa bắt được lỗi biên.`],
      ['Một form có nhiều trường nên test thế nào?', `Mỗi lần chỉ đưa một giá trị không hợp lệ cho một trường, các trường khác hợp lệ để biết chính xác nguyên nhân. Kết hợp thêm ca tất cả hợp lệ và ca rỗng hoàn toàn.`],
    ],
  },
  'Decision table, state transition': {
    theory: [
      ['Decision table (bảng quyết định)', `Dùng khi kết quả phụ thuộc vào tổ hợp nhiều điều kiện. Cột là các quy tắc, hàng trên là điều kiện (True/False), hàng dưới là hành động. Với n điều kiện nhị phân có tối đa 2^n quy tắc; gộp các quy tắc cho cùng kết quả để rút gọn.`],
      ['State transition (chuyển trạng thái)', `Dùng khi hành vi phụ thuộc vào trạng thái hiện tại và sự kiện. Vẽ sơ đồ trạng thái: trạng thái, sự kiện, điều kiện bảo vệ và hành động. Test cần phủ mọi trạng thái, mọi chuyển đổi hợp lệ và ít nhất vài chuyển đổi không hợp lệ.`],
      ['Khi nào chọn kỹ thuật nào', `EP/BVA cho giá trị đầu vào đơn lẻ; decision table cho nghiệp vụ nhiều điều kiện (giảm giá, phân quyền, tính phí); state transition cho quy trình có trạng thái (đơn hàng, đăng nhập bị khoá, thanh toán).`],
    ],
    example: `Giảm giá: thành viên VIP (V) và đơn trên 1 triệu (D). Quy tắc: V+D → giảm 15%; V, không D → 10%; không V, D → 5%; không V, không D → 0%. Bốn cột = bốn test case. Với đăng nhập: trạng thái Active → sai mật khẩu 5 lần → Locked → sau 15 phút → Active.`,
    qa: [
      ['Khi nào dùng decision table?', `Khi có nhiều điều kiện kết hợp cho ra các kết quả khác nhau, ví dụ quy tắc khuyến mãi, phân quyền, tính phí vận chuyển. Bảng giúp không bỏ sót tổ hợp.`],
      ['Test state transition cần phủ những gì?', `Mọi trạng thái, mọi chuyển đổi hợp lệ, và một số chuyển đổi không hợp lệ (ví dụ huỷ đơn đã giao) để xác nhận hệ thống từ chối đúng.`],
      ['Có 3 điều kiện True/False thì tối đa bao nhiêu test case?', `2^3 = 8 tổ hợp. Có thể rút gọn nếu một số điều kiện không ảnh hưởng tới kết quả trong vài quy tắc.`],
    ],
  },
  'Viết test case chuẩn, truy vết yêu cầu': {
    theory: [
      ['Cấu trúc một test case', `ID, tiêu đề (động từ + đối tượng + điều kiện), điều kiện tiên quyết, các bước thực hiện, dữ liệu test, kết quả mong đợi, mức ưu tiên, yêu cầu liên quan, trạng thái. Mỗi test case nên kiểm tra một ý duy nhất và có kết quả mong đợi đo được.`],
      ['Nguyên tắc viết tốt', `Rõ ràng: người khác đọc là chạy được. Độc lập: không phụ thuộc test case khác. Lặp lại được: cùng điều kiện cho cùng kết quả. Có kết quả mong đợi cụ thể (“hiện thông báo ‘Email không hợp lệ’”, không viết “hiện lỗi”). Gồm cả ca tích cực (positive) và tiêu cực (negative).`],
      ['Traceability Matrix (truy vết yêu cầu)', `Bảng liên kết yêu cầu ↔ test case ↔ bug. Giúp kiểm tra mọi yêu cầu đều có test (độ phủ yêu cầu) và biết yêu cầu nào bị ảnh hưởng khi có thay đổi.`],
    ],
    example: `ID: TC-LOGIN-03. Tiêu đề: Đăng nhập thất bại khi mật khẩu sai. Tiên quyết: tài khoản a@x.com tồn tại. Bước: 1) mở trang đăng nhập; 2) nhập a@x.com và mật khẩu sai “123”; 3) bấm Đăng nhập. Mong đợi: ở lại trang, hiện “Email hoặc mật khẩu không đúng”, không tạo phiên đăng nhập. Yêu cầu: US-12.`,
    qa: [
      ['Một test case tốt có đặc điểm gì?', `Mục tiêu rõ ràng, các bước cụ thể, dữ liệu rõ, kết quả mong đợi đo được, độc lập, lặp lại được và truy vết được về yêu cầu.`],
      ['Traceability matrix để làm gì?', `Đảm bảo mọi yêu cầu đều được test, và khi yêu cầu đổi thì biết cần cập nhật test case nào. Ngoài ra liên kết bug với yêu cầu để đánh giá chất lượng từng tính năng.`],
      ['Positive test và negative test khác nhau thế nào?', `Positive dùng dữ liệu hợp lệ để xác nhận hệ thống làm đúng. Negative dùng dữ liệu sai/ngoại lệ để xác nhận hệ thống từ chối và báo lỗi đúng cách.`],
    ],
  },
  'Review & ưu tiên test case': {
    theory: [
      ['Review test case', `Nhờ đồng nghiệp hoặc dev đọc lại test case để tìm thiếu sót, trùng lặp, bước mơ hồ, kết quả mong đợi sai. Dùng checklist: có phủ hết acceptance criteria? Có ca biên và ca lỗi? Dữ liệu cụ thể? Có độc lập?`],
      ['Ưu tiên theo rủi ro', `Rủi ro = khả năng xảy ra × mức độ ảnh hưởng. Test trước các chức năng quan trọng với nghiệp vụ (thanh toán, đăng nhập), hay bị lỗi, mới thay đổi hoặc có nhiều người dùng. Gán P1 (bắt buộc), P2 (quan trọng), P3 (nên có).`],
      ['Test suite và độ phủ', `Nhóm test case thành suite: smoke (P1 nhanh), regression (P1+P2), full. Theo dõi độ phủ yêu cầu và độ phủ rủi ro; loại bỏ test case trùng hoặc lỗi thời để bộ test gọn và đáng tin.`],
    ],
    example: `Hết thời gian còn 1 ngày, còn 120 test case. Chọn: toàn bộ P1 (đăng nhập, thanh toán, tạo đơn – 30 ca), P2 của module vừa sửa (25 ca), bỏ P3 giao diện nhỏ. Ghi rõ phần chưa test vào báo cáo để nhóm quyết định rủi ro.`,
    qa: [
      ['Bạn ưu tiên test case dựa trên tiêu chí nào?', `Mức độ ảnh hưởng nghiệp vụ, khả năng xảy ra lỗi, tần suất sử dụng, mức độ thay đổi gần đây và lịch sử bug. Ưu tiên luồng cốt lõi và vùng thay đổi.`],
      ['Hết thời gian mà chưa test xong thì làm gì?', `Test theo thứ tự ưu tiên rủi ro, báo cáo rõ phần đã/chưa test và rủi ro còn lại để PM/PO quyết định phát hành hay lùi, không im lặng cắt bớt.`],
      ['Review test case nhằm tìm gì?', `Thiếu độ phủ yêu cầu, ca biên/ca lỗi chưa có, bước mơ hồ, kết quả mong đợi không đo được, trùng lặp và phụ thuộc lẫn nhau.`],
    ],
  },
};

export default {
  'JavaScript đủ dùng cho tester': {
    theory: [
      ['Biến và kiểu dữ liệu', `const (không gán lại), let (gán lại được), tránh var. Kiểu: string, number, boolean, null, undefined, object, array. So sánh dùng === (so sánh cả kiểu) thay vì ==. Template string: \`Xin chào, \${name}\`.`],
      ['Hàm, mảng, object', `Hàm thường và arrow function: const sum = (a, b) => a + b. Mảng: map (biến đổi), filter (lọc), find, forEach. Object: truy cập user.name, destructuring const { name, email } = user.`],
      ['Bất đồng bộ', `Thao tác chờ (gọi API, mở trang) trả về Promise. async/await giúp viết tuần tự dễ đọc: const res = await fetch(url). Quên await là lỗi rất phổ biến trong test tự động. Dùng try/catch để bắt lỗi.`],
      ['Module', `export / import để chia code thành file: export const login = ...; import { login } from './auth.js'. Dùng npm để cài thư viện, package.json quản lý phụ thuộc và script.`],
    ],
    example: `const users = [{ name: 'An', age: 17 }, { name: 'Bình', age: 25 }]; const adults = users.filter((u) => u.age >= 18).map((u) => u.name); // ['Bình']. Với API: const res = await fetch(url); const data = await res.json();`,
    qa: [
      ['== và === khác nhau thế nào?', `== ép kiểu rồi so sánh (0 == '0' là true), === so sánh cả kiểu (0 === '0' là false). Nên luôn dùng ===.`],
      ['async/await là gì, vì sao quan trọng khi viết test?', `Là cách xử lý Promise tuần tự dễ đọc. Test tự động toàn thao tác bất đồng bộ; thiếu await khiến bước kế tiếp chạy trước khi bước trước xong, làm test chập chờn.`],
      ['map và filter khác nhau?', `map biến đổi từng phần tử và trả mảng cùng độ dài; filter giữ lại phần tử thoả điều kiện nên mảng mới có thể ngắn hơn.`],
    ],
  },
  'Playwright: locator, assertion, fixture': {
    theory: [
      ['Locator', `Cách tìm phần tử ưu tiên theo ngữ nghĩa, bền vững hơn CSS/XPath: page.getByRole('button', { name: 'Đăng nhập' }), getByLabel, getByPlaceholder, getByText, getByTestId. Locator tự chờ phần tử sẵn sàng (auto-waiting), không cần sleep cứng.`],
      ['Assertion', `Dùng expect của Playwright có cơ chế tự thử lại (web-first assertions): await expect(page).toHaveURL(/dashboard/); await expect(page.getByText('Xin chào')).toBeVisible(); toHaveText, toHaveValue, toHaveCount.`],
      ['Fixture và cấu hình', `Fixture cung cấp tài nguyên cho test như page, context, request; có thể tự định nghĩa (ví dụ trang đã đăng nhập) bằng test.extend. playwright.config định nghĩa baseURL, trình duyệt, retries, trace. Hook: beforeEach/afterEach.`],
      ['Gỡ lỗi', `Trace Viewer xem từng bước kèm ảnh chụp, DOM, network; chế độ --ui và --debug; codegen ghi thao tác thành code mẫu; chụp ảnh/video khi lỗi.`],
    ],
    example: `import { test, expect } from '@playwright/test'; test('đăng nhập thành công', async ({ page }) => { await page.goto('/login'); await page.getByLabel('Email').fill('a@x.com'); await page.getByLabel('Mật khẩu').fill('Secret123'); await page.getByRole('button', { name: 'Đăng nhập' }).click(); await expect(page).toHaveURL(/dashboard/); });`,
    qa: [
      ['Vì sao nên tránh sleep/waitForTimeout cố định?', `Làm test chậm và vẫn chập chờn vì thời gian tải thay đổi. Playwright có auto-waiting và web-first assertion tự thử lại nên chỉ chờ đúng điều kiện cần.`],
      ['Locator nào ổn định nhất?', `Ưu tiên getByRole/getByLabel/getByTestId vì gắn với ngữ nghĩa và ít đổi khi giao diện thay đổi, hơn là CSS hoặc XPath phụ thuộc cấu trúc DOM.`],
      ['Fixture trong Playwright dùng để làm gì?', `Cung cấp và chuẩn bị/dọn dẹp tài nguyên cho test (trang đã đăng nhập, dữ liệu, API client) và chia sẻ cho nhiều test mà không lặp code.`],
    ],
  },
  'Page Object & dữ liệu test': {
    theory: [
      ['Page Object Model (POM)', `Mỗi trang (hoặc thành phần lớn) là một class chứa locator và hành động của trang đó. Test chỉ gọi hành động (loginPage.login(email, pass)) và không biết chi tiết locator. Khi giao diện đổi, chỉ sửa một chỗ.`],
      ['Nguyên tắc', `Page object chứa locator và hành động; assertion nên để trong test. Tên hành động theo ý nghĩa nghiệp vụ (submitOrder), không theo thao tác (clickButton3). Tránh page object quá to; tách component dùng chung (header, bảng).`],
      ['Dữ liệu test', `Tách dữ liệu khỏi code test (file JSON, factory tạo dữ liệu). Mỗi test tạo dữ liệu riêng và dọn sau khi chạy để độc lập, có thể chạy song song. Tránh dùng dữ liệu cố định dùng chung dễ xung đột. Có thể tạo dữ liệu qua API thay vì giao diện cho nhanh.`],
    ],
    example: `class LoginPage { constructor(page) { this.page = page; this.email = page.getByLabel('Email'); } async login(e, p) { await this.email.fill(e); await this.page.getByLabel('Mật khẩu').fill(p); await this.page.getByRole('button', { name: 'Đăng nhập' }).click(); } }  // test: await new LoginPage(page).login(user.email, user.password);`,
    qa: [
      ['Lợi ích của Page Object Model?', `Giảm trùng lặp, dễ bảo trì (đổi giao diện chỉ sửa page object), test dễ đọc theo ngôn ngữ nghiệp vụ.`],
      ['Làm sao giữ cho các test độc lập?', `Mỗi test tự tạo và dọn dữ liệu riêng, không phụ thuộc thứ tự chạy hay kết quả của test khác, nhờ đó chạy song song và đỡ chập chờn.`],
      ['Test chập chờn (flaky) thường do đâu?', `Chờ không đúng (sleep, thiếu await), dữ liệu dùng chung bị xung đột, phụ thuộc thứ tự chạy, môi trường không ổn định hoặc locator phụ thuộc cấu trúc DOM.`],
    ],
  },
  'Chạy test trong CI': {
    theory: [
      ['CI là gì', `Continuous Integration: mỗi lần push/PR, hệ thống tự build và chạy test. Lợi ích: phát hiện lỗi sớm, kết quả khách quan, chặn merge khi test đỏ. CD (Continuous Delivery/Deployment) tự triển khai khi qua kiểm tra.`],
      ['Pipeline với GitHub Actions', `File YAML trong .github/workflows: on (khi push, pull_request), jobs, steps: checkout, cài Node, cài phụ thuộc, cài trình duyệt (npx playwright install --with-deps), chạy test (npx playwright test), upload báo cáo/trace làm artifact.`],
      ['Thực hành tốt', `Chạy smoke trên mỗi PR, regression đầy đủ theo lịch hoặc trước phát hành; chạy song song (shard); lưu artifact khi lỗi; dùng secrets cho mật khẩu/token, không commit vào repo; hạn chế retry vì che giấu test chập chờn.`],
    ],
    example: `on: [pull_request]. jobs: test: runs-on: ubuntu-latest; steps: - uses: actions/checkout@v4 - uses: actions/setup-node@v4 (node-version: 20) - run: npm ci - run: npx playwright install --with-deps - run: npx playwright test - uses: actions/upload-artifact@v4 (if: failure, path: playwright-report).`,
    qa: [
      ['CI/CD là gì và tester hưởng lợi thế nào?', `CI tự build và test mỗi lần đổi code; CD tự triển khai. Tester có phản hồi sớm, regression chạy tự động và giảm công việc lặp lại thủ công.`],
      ['Lưu thông tin nhạy cảm (mật khẩu, token) khi chạy CI ở đâu?', `Trong secrets của CI (GitHub Secrets) và truyền qua biến môi trường, không đưa vào mã nguồn.`],
      ['Test đỏ trên CI nhưng xanh ở máy bạn, làm gì?', `So sánh môi trường (phiên bản Node, trình duyệt, dữ liệu, múi giờ), xem trace/video artifact, chạy lại nhiều lần để xác định chập chờn, rồi sửa nguyên nhân thay vì tăng retry.`],
    ],
  },
  'Prompt hiệu quả cho kiểm thử': {
    theory: [
      ['Cấu trúc prompt tốt', `Vai trò (bạn là QA senior), ngữ cảnh (sản phẩm, người dùng), nhiệm vụ (làm gì), ràng buộc (kỹ thuật dùng, độ dài), định dạng đầu ra (bảng markdown/CSV với các cột cụ thể), ví dụ mẫu (few-shot). Càng cụ thể càng ít phải sửa.`],
      ['Kỹ thuật', `Cho AI hỏi lại khi thiếu thông tin; yêu cầu liệt kê giả định; làm theo bước (phân tích → kịch bản → test case); đưa ví dụ một test case chuẩn của nhóm; lặp và tinh chỉnh bằng phản hồi cụ thể.`],
      ['Bảo mật dữ liệu', `Không dán dữ liệu thật của khách hàng, mật khẩu, mã nguồn mật vào công cụ AI công cộng. Ẩn danh hoá hoặc dùng dữ liệu giả. Tuân thủ chính sách công ty.`],
    ],
    example: `“Bạn là QA senior. Tính năng: đăng nhập bằng email/mật khẩu, khoá sau 5 lần sai. Hãy sinh test case dùng EP/BVA và state transition. Xuất bảng markdown gồm: ID, Tiêu đề, Bước, Dữ liệu, Kết quả mong đợi, Ưu tiên. Nếu thiếu thông tin hãy hỏi lại trước khi viết.”`,
    qa: [
      ['Một prompt sinh test case tốt gồm những phần nào?', `Vai trò, ngữ cảnh tính năng, nhiệm vụ, kỹ thuật thiết kế test mong muốn, ràng buộc, định dạng bảng đầu ra và ví dụ mẫu; kèm yêu cầu hỏi lại khi thiếu thông tin.`],
      ['Làm sao giảm việc AI bịa thông tin?', `Cung cấp tài liệu yêu cầu thật, yêu cầu chỉ dựa vào tài liệu và nêu giả định, cho phép trả lời “chưa đủ thông tin” và luôn đối chiếu kết quả với yêu cầu.`],
      ['Có nên dán dữ liệu khách hàng thật vào AI không?', `Không. Dùng dữ liệu giả hoặc ẩn danh và tuân thủ chính sách bảo mật của công ty.`],
    ],
  },
  'AI phân tích yêu cầu, tìm điểm mơ hồ': {
    theory: [
      ['Việc AI làm tốt', `Tóm tắt yêu cầu; trích xuất actor, luồng chính, luồng phụ, quy tắc nghiệp vụ; phát hiện thiếu sót, mâu thuẫn, từ mơ hồ; sinh danh sách câu hỏi cho PO/BA; gợi ý ca biên và ca lỗi mà người dễ bỏ sót.`],
      ['Quy trình gợi ý', `1) Dán yêu cầu (đã ẩn thông tin nhạy cảm). 2) Yêu cầu AI liệt kê: actor, luồng, quy tắc, dữ liệu, giả định. 3) Yêu cầu liệt kê điểm mơ hồ/mâu thuẫn kèm câu hỏi. 4) Tester lọc câu hỏi thật sự quan trọng và gửi PO. 5) Cập nhật yêu cầu rồi mới sinh test.`],
      ['Vai trò của người', `AI đề xuất, tester quyết định. Câu hỏi AI nêu phải được xác minh với người nắm nghiệp vụ; không xem câu trả lời suy đoán của AI là yêu cầu thật.`],
    ],
    example: `Yêu cầu: “Người dùng đặt lại mật khẩu qua email.” AI gợi ý hỏi lại: thời hạn link? số lần yêu cầu tối đa? chính sách mật khẩu mới? thông báo khi email không tồn tại? có đăng xuất thiết bị khác? Tester chọn các câu quan trọng gửi PO.`,
    qa: [
      ['AI giúp gì ở bước phân tích yêu cầu?', `Tóm tắt, rút luồng và quy tắc, chỉ ra điểm mơ hồ/mâu thuẫn và đề xuất câu hỏi, từ đó tester tiết kiệm thời gian rà soát và bớt sót.`],
      ['Câu trả lời AI đoán cho chỗ mơ hồ có dùng làm yêu cầu được không?', `Không. Đó chỉ là giả định; cần xác nhận với PO/BA rồi ghi vào tài liệu yêu cầu.`],
      ['Bạn kiểm tra thế nào để chắc AI hiểu đúng yêu cầu?', `Yêu cầu AI liệt kê lại luồng và quy tắc rồi đối chiếu với tài liệu gốc, và để người nắm nghiệp vụ xác nhận.`],
    ],
  },
  'AI sinh test case & dữ liệu test': {
    theory: [
      ['Quy trình dựng test với AI', `Yêu cầu → (AI) kịch bản (luồng chính, luồng phụ, ngoại lệ) → (AI) test case theo kỹ thuật (EP/BVA, decision table, state) → (người) review → chỉnh sửa → xuất CSV/Jira/code Playwright. Mỗi bước có đầu ra rõ ràng để dễ kiểm tra.`],
      ['Sinh dữ liệu test', `AI tạo dữ liệu hợp lệ/không hợp lệ, ca biên, chuỗi dài, ký tự đặc biệt/Unicode, dữ liệu giả theo định dạng (số điện thoại, CMND giả). Yêu cầu rõ định dạng đầu ra (JSON/CSV) và quy tắc nghiệp vụ.`],
      ['Sinh code tự động hoá', `Có thể nhờ AI viết khung Playwright/Postman từ test case, nhưng phải đọc và chạy thử: locator có thể sai, thiếu await, assertion yếu. Xem code AI sinh như code của một đồng nghiệp mới cần review.`],
    ],
    example: `Từ kịch bản “khoá tài khoản sau 5 lần sai”, AI sinh: TC-02 nhập sai 4 lần (vẫn đăng nhập được lần 5 đúng), TC-03 nhập sai 5 lần (khoá 15 phút), TC-04 sau 15 phút đăng nhập lại được. Tester bổ sung ca đồng thời nhiều thiết bị mà AI bỏ sót.`,
    qa: [
      ['Quy trình bạn dùng AI để sinh test case?', `Đưa yêu cầu đã rõ, cho AI tạo kịch bản rồi test case theo kỹ thuật chỉ định với định dạng bảng, sau đó tester review, bổ sung ca còn thiếu và xuất sang công cụ quản lý.`],
      ['Rủi ro khi dùng code tự động hoá do AI sinh?', `Locator sai, thiếu await, assertion yếu hoặc bịa API; luôn phải đọc, chạy thử và sửa trước khi đưa vào bộ test.`],
      ['Dữ liệu test AI sinh cần kiểm tra gì?', `Có đúng định dạng và quy tắc nghiệp vụ, đủ ca biên và ca lỗi, không chứa dữ liệu thật/nhạy cảm và có thể chạy lặp.`],
    ],
  },
  'Kiểm chứng và giới hạn của AI': {
    theory: [
      ['Giới hạn của AI', `Có thể bịa (hallucination) bước, màn hình hay API không tồn tại; thiếu ngữ cảnh nghiệp vụ riêng của công ty; bỏ sót ca khó hoặc phụ thuộc cao; kết quả không nhất quán giữa các lần; không chịu trách nhiệm cho chất lượng.`],
      ['Checklist kiểm chứng', `1) Mỗi test case truy vết được tới yêu cầu. 2) Kết quả mong đợi đúng với yêu cầu, không phải suy đoán. 3) Có ca biên, ca lỗi, phân quyền. 4) Không trùng lặp. 5) Dữ liệu cụ thể và chạy được. 6) Chạy thử một mẫu để xác nhận. 7) So với bộ test viết tay để tìm phần thiếu.`],
      ['Đo hiệu quả', `Đo thời gian tiết kiệm, số ca dùng được sau review, số bug tìm thấy từ ca do AI sinh và tỷ lệ phải sửa. Dùng số liệu này để cải tiến prompt và quyết định nên dùng AI ở đâu.`],
    ],
    example: `AI sinh 30 test case: sau review giữ 22 ca đúng, sửa 5 ca (kết quả mong đợi sai), bỏ 3 ca trùng, bổ sung thêm 4 ca biên mà AI bỏ sót. Tỷ lệ dùng được 73% trước khi sửa; ghi lại để cải tiến prompt lần sau.`,
    qa: [
      ['Hallucination là gì và phòng ngừa thế nào?', `Là khi AI tạo thông tin nghe hợp lý nhưng không có thật. Phòng ngừa bằng cách cung cấp tài liệu thật, yêu cầu chỉ dựa trên tài liệu, truy vết về yêu cầu và review của người.`],
      ['Bạn chịu trách nhiệm gì khi dùng test case do AI sinh?', `Tester chịu trách nhiệm cuối cùng về chất lượng: phải review, kiểm chứng, bổ sung và quyết định test case nào được dùng.`],
      ['AI có thay thế tester được không?', `Chưa thay thế. AI tăng tốc việc lặp lại và gợi ý ý tưởng, nhưng hiểu nghiệp vụ, đánh giá rủi ro, tư duy phản biện và chịu trách nhiệm vẫn là của tester.`],
    ],
  },
};

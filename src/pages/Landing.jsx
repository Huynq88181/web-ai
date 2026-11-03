import { useEffect, useState } from 'react';
import { Button, Collapse, Drawer, Modal, Tag } from 'antd';
import {
  ArrowRight, Bot, Bug, Database, FileText, FlaskConical, ListChecks, Search, Sparkles, Terminal, Wrench,
} from 'lucide-react';
import CapyLogo from '@/components/CapyLogo';
import BlurText from '@/components/BlurText';
import FadeContent from '@/components/FadeContent';
import { colors } from '@/styles/theme';
import { fetchCourse, fetchLesson } from '@/lib/api';
import { track } from '@/lib/track';
import lessonData from '@/data/lessons';
import Aurora from '@/components/Aurora';
import CountUp from '@/components/CountUp';
import LogoLoop from '@/components/LogoLoop';
import Magnet from '@/components/Magnet';
import ShinyText from '@/components/ShinyText';
import Carousel from '@/components/Carousel';
import Panel from '@/components/Panel';

// Dữ liệu dự phòng: dùng khi server chưa trả được khoá học.
const fallbackPhases = [
  {
    icon: FlaskConical, title: 'Nền tảng kiểm thử', summary: 'Làm quen với nghề tester: kiểm thử nằm ở đâu trong vòng đời phần mềm và một tester thực sự làm gì mỗi ngày.', practice: 'Đọc một user story bất kỳ và liệt kê 10 câu hỏi cần làm rõ với PO.', outcome: 'Hiểu quy trình test từ yêu cầu đến báo cáo', time: 'Tuần 1 · Ngày 1–2',
    lessons: ['SDLC, STLC và vai trò tester', '7 nguyên tắc kiểm thử', 'Các loại & mức độ test', 'Đọc hiểu yêu cầu / user story'],
  },
  {
    icon: ListChecks, title: 'Thiết kế Test Case', summary: 'Học các kỹ thuật thiết kế để test đủ mà không thừa: chia lớp tương đương, giá trị biên, bảng quyết định.', practice: 'Viết 20 Test Case cho form đăng ký, gắn mỗi Test Case với một yêu cầu.', outcome: 'Tự viết bộ Test Case cho một tính năng', time: 'Tuần 1 · Ngày 3–5',
    lessons: ['Equivalence Partitioning & Boundary Value', 'Decision table, state transition', 'Viết test case chuẩn, truy vết yêu cầu', 'Review & ưu tiên test case'],
  },
  {
    icon: Bug, title: 'Quản lý lỗi & báo cáo', summary: 'Biết mô tả lỗi để dev tái hiện được ngay, phân biệt mức độ nghiêm trọng và độ ưu tiên, theo dõi lỗi trên Jira.', practice: 'Tìm và báo cáo 5 bug trên một website thật, kèm ảnh chụp và các bước tái hiện.', outcome: 'Báo cáo bug rõ ràng, dev đọc là tái hiện được', time: 'Tuần 2 · Ngày 1–2',
    lessons: ['Vòng đời bug, severity vs priority', 'Viết bug report dễ tái hiện', 'Jira / công cụ quản lý test', 'Báo cáo kết quả test'],
  },
  {
    icon: Wrench, title: 'Công cụ & API testing', summary: 'Dùng DevTools, SQL và Postman để nhìn xuống tầng dưới giao diện: request, response và dữ liệu thực tế.', practice: 'Dựng collection Postman cho một API công khai, có assert cho status và body.', outcome: 'Kiểm thử API và đối chiếu dữ liệu thật', time: 'Tuần 2 · Ngày 3–5',
    lessons: ['Chrome DevTools cho tester', 'SQL cơ bản để kiểm tra dữ liệu', 'Postman: request, assert, collection', 'Kiểm thử REST API'],
  },
  {
    icon: Terminal, title: 'Tự động hoá', summary: 'Chuyển các ca lặp đi lặp lại thành script chạy tự động bằng Playwright và gắn vào CI.', practice: 'Tự động hoá luồng đăng nhập và tạo đơn hàng, chạy tự động mỗi lần push code.', outcome: 'Có bộ test tự động chạy trên CI', time: 'Tuần 3 · Ngày 1–5',
    lessons: ['JavaScript đủ dùng cho tester', 'Playwright: locator, assertion, fixture', 'Page Object & dữ liệu test', 'Chạy test trong CI'],
  },
  {
    icon: Bot, title: 'AI cho tester', summary: 'Dùng AI như trợ lý: phân tích yêu cầu, sinh Test Case, tạo dữ liệu test, đồng thời biết kiểm chứng kết quả.', practice: 'Viết prompt mẫu sinh Test Case cho một tính năng và đối chiếu với bộ test viết tay.', outcome: 'Dùng AI sinh Test Case và biết kiểm chứng', time: 'Tuần 4 · Ngày 1–2',
    lessons: ['Prompt hiệu quả cho kiểm thử', 'AI phân tích yêu cầu, tìm điểm mơ hồ', 'AI sinh test case & dữ liệu test', 'Kiểm chứng và giới hạn của AI'],
  },
];

const pipeline = [
  { icon: FileText, title: 'Nhập yêu cầu', text: 'Dán user story, PRD, tài liệu thiết kế hoặc ghi chú họp.', summary: 'Đầu vào của cả quy trình: tài liệu yêu cầu ở dạng văn bản tự do. Nên ẩn thông tin nhạy cảm trước khi đưa vào công cụ AI.', example: 'Là người dùng, tôi muốn đăng nhập bằng email và mật khẩu để vào trang chủ; khoá tài khoản sau 5 lần sai.', output: 'văn bản yêu cầu' },
  { icon: Search, title: 'Harness phân tích', text: 'Harness chạy các bước phân tích cố định: actor, luồng, quy tắc, điểm mơ hồ.', summary: 'Harness là bộ khung chạy AI theo quy trình cố định và có kiểm tra: mỗi lần đều rút cùng một bộ thông tin (actor, luồng chính/phụ, quy tắc nghiệp vụ, dữ liệu, giả định, điểm mơ hồ) theo một định dạng chuẩn, thay vì hỏi AI tự do.', example: 'Actor: khách hàng. Quy tắc: sai 5 lần thì khoá. Mơ hồ: khoá bao lâu? Có gửi email báo không?', output: 'báo cáo phân tích và danh sách câu hỏi' },
  { icon: Database, title: 'Xây Knowledge Base', text: 'Gom kết quả phân tích thành Knowledge Base: quy tắc, thuật ngữ, ràng buộc, màn hình.', summary: 'Knowledge Base là nơi lưu tri thức đã được người xác nhận: quy tắc nghiệp vụ, thuật ngữ, ràng buộc dữ liệu, trạng thái, danh sách màn hình/API và câu trả lời của PO. Mỗi mục có mã để truy vết (ví dụ Quy tắc 03).', example: 'Quy tắc 03: sai mật khẩu 5 lần liên tiếp thì khoá 15 phút. Nguồn: US-12, PO xác nhận ngày 02/11.', output: 'Knowledge Base có mã truy vết' },
  { icon: Sparkles, title: 'Dựng Test Scenario', text: 'Dùng Knowledge Base để dựng Test Scenario: luồng chính, luồng phụ, ngoại lệ.', summary: 'Test Scenario được sinh từ Knowledge Base chứ không từ yêu cầu thô, nên mỗi Test Scenario gắn với mã quy tắc trong Knowledge Base và bám đúng điều đã được xác nhận. Nhờ đó giảm bịa và dễ kiểm tra độ phủ.', example: 'Test Scenario 02 (Quy tắc 03): đăng nhập sai 5 lần liên tiếp thì tài khoản bị khoá 15 phút.', output: 'danh sách Test Scenario phủ các quy tắc trong Knowledge Base' },
  { icon: ListChecks, title: 'Sinh Test Case & xuất', text: 'Mở rộng Test Scenario thành Test Case, tester duyệt rồi xuất CSV / Jira / Playwright.', summary: 'Mỗi Test Scenario được mở rộng thành Test Case đầy đủ theo EP/BVA, decision table, state transition. Tester review, bổ sung ca biên, kiểm tra truy vết Test Scenario → Knowledge Base, rồi xuất sang công cụ đội đang dùng.', example: 'Test Case 05 (Test Scenario 02): nhập sai mật khẩu lần thứ 5 → hiện “Tài khoản bị khoá 15 phút”.', output: 'file CSV / Jira / khung Playwright' },
];

const tools = ['Postman', 'Playwright', 'Jira', 'SQL', 'Chrome DevTools', 'JavaScript', 'Git', 'GitHub Actions', 'Claude', 'ChatGPT'].map((t) => ({
  node: <span className="rounded-full border bg-card px-4 py-1.5 text-sm font-medium">{t}</span>,
  title: t,
}));

const phaseIcons = [FlaskConical, ListChecks, Bug, Wrench, Terminal, Bot];

const projectPrompt = `Bạn là QA senior. Hãy giúp tôi xây một công cụ web dùng AI dựng Test Scenario và Test Case từ yêu cầu.

Quy trình bắt buộc:
1. Harness phân tích: nhận văn bản yêu cầu, rút actor, luồng chính/phụ, quy tắc nghiệp vụ, dữ liệu, giả định và điểm mơ hồ (kèm câu hỏi cho PO).
2. Knowledge Base: lưu các quy tắc đã được người xác nhận, mỗi mục có mã (Quy tắc 01, Quy tắc 02...) và nguồn.
3. Test Scenario: sinh Test Scenario từ Knowledge Base, mỗi Test Scenario gắn mã quy tắc.
4. Test Case: mở rộng Test Scenario theo EP/BVA, decision table, state transition; xuất bảng gồm ID, Tiêu đề, Điều kiện, Bước, Dữ liệu, Kết quả mong đợi, Ưu tiên, Mã Test Scenario và Quy tắc.

Ràng buộc: chỉ dựa trên Knowledge Base, thiếu thông tin thì hỏi lại, không bịa; có bước review của tester trước khi xuất CSV.
Hãy bắt đầu bằng kế hoạch rồi code từng bước, chạy thử với tính năng "Đăng nhập".`;

const expected = [
  'Báo cáo phân tích yêu cầu và danh sách câu hỏi cho PO',
  'Knowledge Base có mã truy vết (Quy tắc 01, 02...) và nguồn',
  'Danh sách Test Scenario phủ các quy tắc trong Knowledge Base',
  'Bảng Test Case đầy đủ, có ca biên và ca lỗi, xuất được CSV',
  'Ma trận truy vết Quy tắc → Test Scenario → Test Case để kiểm tra độ phủ',
];

const sample = [
  ['Test Case 01', 'Đăng nhập đúng email & mật khẩu', 'Vào trang chủ', 'High'],
  ['Test Case 02', 'Mật khẩu sai 5 lần liên tiếp', 'Khoá tài khoản 15 phút', 'High'],
  ['Test Case 03', 'Email thiếu ký tự @', 'Báo lỗi định dạng email', 'Medium'],
];

const Section = ({ id, eyebrow, title, children }) => (
  <section id={id} className="mx-auto max-w-6xl scroll-mt-16 px-5 py-16 md:py-24">
    <p className="text-sm font-medium text-primary">{eyebrow}</p>
    <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
    <FadeContent className="mt-10" blur>{children}</FadeContent>
  </section>
);

export default function Landing() {
  const [active, setActive] = useState(null);
  const [phases, setPhases] = useState(fallbackPhases);
  const [lesson, setLesson] = useState(null);
  const [lessonId, setLessonId] = useState(null);
  const [lessonOpen, setLessonOpen] = useState(false);
  const [remote, setRemote] = useState({});
  // Bản từ server (nếu đã tải xong) được ưu tiên, nếu không dùng nội dung có sẵn trong code.
  const detail = (lessonId && remote[lessonId]) || (lesson && lessonData[lesson]);
  const stats = [
    [4, 'tuần full-time'],
    [phases.length, 'chặng'],
    [phases.reduce((n, p) => n + p.lessons.length, 0), 'bài học'],
    [1, 'project AI'],
  ];

  useEffect(() => {
    fetchCourse()
      .then((c) => {
        if (!c.phases.length) return;
        setPhases(c.phases.map((p, i) => ({
          icon: phaseIcons[i % phaseIcons.length],
          title: p.title,
          time: p.timeLabel,
          summary: p.summary,
          practice: p.practice,
          outcome: p.outcome,
          lessons: p.lessons.map((l) => l.title),
          lessonIds: Object.fromEntries(p.lessons.map((l) => [l.title, l.id])),
        })));
      })
      .catch(() => {}); // lỗi mạng: giữ dữ liệu dự phòng
  }, []);

  const openLesson = (title, id) => {
    track('open_lesson', title);
    setLesson(title);
    setLessonId(id ?? null);
    setLessonOpen(true);
    if (id && !remote[id]) {
      fetchLesson(id)
        .then((d) => setRemote((r) => ({
          ...r,
          [id]: {
            theory: d.theory.map((t) => [t.heading, t.body]),
            example: d.example,
            qa: d.questions.map((q) => [q.question, q.answer]),
          },
        })))
        .catch(() => {});
    }
  };
  useEffect(() => { track('page_view'); }, []);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <CapyLogo size={36} /> CapyTest
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#lo-trinh" className="hover:text-foreground">Lộ trình</a>
            <a href="#project" className="hover:text-foreground">Project AI</a>
          </nav>
          <Button type="primary" href="#lo-trinh" onClick={() => track('click_cta', 'header')}>Bắt đầu học</Button>
        </div>
      </header>

      <main id="top">
        <div className="relative overflow-hidden">
        <Aurora className="pointer-events-none absolute inset-0 opacity-50" lightMode colorStops={[colors.primary, colors.primaryLight, colors.primaryTintBg]} />
        <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-28">
          <div>
            <Tag color="blue" variant="filled"><ShinyText text="Lộ trình 4 tuần full-time · Dành cho intern" color={colors.primary} shineColor={colors.primaryLight} /></Tag>
            <h1 className="mt-5 flex flex-wrap gap-x-[0.25em] text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              <BlurText text="Học test" />
              <BlurText text="bình tĩnh," className="text-primary" delay={300} />
              <BlurText text="như một chú capybara." delay={400} />
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Đi từ kiến thức nền tảng, thiết kế Test Case, API, tự động hoá đến dùng AI để dựng kịch bản và Test Case cho project thật.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnet>
                <Button type="primary" size="large" href="#lo-trinh" onClick={() => track('click_cta', 'hero')} icon={<ArrowRight size={16} />} iconPlacement="end">
                  Xem lộ trình
                </Button>
              </Magnet>
              <Button size="large" href="#project">Project cuối khoá</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="animate-[float_4s_ease-in-out_infinite] rounded-[2rem] border bg-card p-10 shadow-sm md:p-14">
              <CapyLogo size={220} />
            </div>
          </div>
        </section>
        </div>

        <section className="mx-auto max-w-6xl px-5">
          <dl className="grid grid-cols-2 gap-5 rounded-lg border bg-card p-6 text-center md:grid-cols-4">
            {stats.map(([n, label]) => (
              <div key={label}>
                <dt className="text-4xl font-semibold text-primary"><CountUp to={n} /></dt>
                <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <LogoLoop logos={tools} speed={60} gap={16} ariaLabel="Công cụ sẽ học" />
          </div>
        </section>


        <Section id="lo-trinh" eyebrow="Lộ trình học" title="6 chặng, mỗi chặng một bộ kỹ năng dùng được ngay">
          <Carousel label={`${phases.length} chặng · 4 tuần full-time`}>
            {phases.map((phase, i) => {
              const { icon: Icon, title, time, lessons, outcome } = phase;
              return (
              <div key={title} className="h-full">
                <Panel
                  onOpen={() => { track('open_phase', title); setActive({ ...phase, kind: 'phase', no: i + 1 }); }}
                  header={
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                        <Icon size={18} />
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold">{String(i + 1).padStart(2, '0')} · {title}</p>
                        <p className="text-xs text-muted-foreground">{time}</p>
                      </div>
                    </div>
                  }
                  footer={<>Kết quả: <span className="text-foreground">{outcome}</span></>}
                >
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {lessons.map((l) => (
                      <li key={l} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />{l}</li>
                    ))}
                  </ul>
                </Panel>
              </div>
              );
            })}
          </Carousel>
        </Section>

        <Section id="project" eyebrow="Project cuối khoá · Tuần 4, ngày 3–5" title="Xây công cụ dùng AI dựng kịch bản và Test Case">
          <div className="mb-10">
            <Panel
              header={<p className="font-semibold">Cách thực hiện: xây bằng Claude Code</p>}
              footer={<>Tài khoản Claude: vui lòng liên hệ <span className="font-medium text-foreground">Huy – 0836495495</span></>}
            >
              <div className="grid gap-6 text-sm md:grid-cols-2">
                <div>
                  <p className="font-semibold">Kết quả đầu ra mong muốn</p>
                  <ul className="mt-2 space-y-2 text-muted-foreground">
                    {expected.map((e) => (
                      <li key={e} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />{e}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Prompt đưa cho Claude Code</p>
                    <Button size="small" onClick={() => { track('copy_prompt'); navigator.clipboard?.writeText(projectPrompt); }}>Sao chép</Button>
                  </div>
                  <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-3 text-xs leading-relaxed">{projectPrompt}</pre>
                </div>
              </div>
            </Panel>
          </div>

          <Carousel label="Quy trình 5 bước: Yêu cầu → Harness → Knowledge Base → Test Scenario → Test Case">
            {pipeline.map((step, i) => {
              const { icon: Icon, title, text, output } = step;
              return (
              <Panel
                key={title}
                onOpen={() => setActive({ ...step, kind: 'step', no: i + 1 })}
                header={<div className="flex items-center gap-2 font-semibold"><Icon size={18} className="text-primary" />Bước {i + 1}</div>}
                footer={<>Đầu ra: <span className="text-foreground">{output}</span></>}
              >
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </Panel>
              );
            })}
          </Carousel>

          <div className="mt-8">
            <Panel
              header={<p className="font-semibold">Ví dụ đầu ra: tính năng “Đăng nhập”</p>}
              footer="AI chỉ là trợ lý: bạn luôn là người review, bổ sung ca biên và quyết định Test Case nào được dùng."
              className="!overflow-visible"
            >
              <div className="-mx-5 -my-4 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-secondary text-secondary-foreground">
                    <tr>{['ID', 'Kịch bản', 'Kết quả mong đợi', 'Ưu tiên'].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {sample.map((row) => (
                      <tr key={row[0]} className="border-t first:border-t-0">
                        {row.map((c, i) => <td key={i} className="px-5 py-3">{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        </Section>

        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground">
            <h2 className="text-3xl font-semibold">Sẵn sàng bắt đầu bài học đầu tiên?</h2>
            <p className="mt-2 opacity-80">Mỗi ngày một chút, capybara cũng đến đích.</p>
            <Button size="large" className="mt-6" href="#lo-trinh">Bắt đầu chặng 1</Button>
          </div>
        </section>
      </main>

      <Modal
        open={!!active}
        onCancel={() => setActive(null)}
        footer={<Button type="primary" onClick={() => setActive(null)}>Đóng</Button>}
        title={active && `${active.kind === 'phase' ? 'Chặng' : 'Bước'} ${active.no}: ${active.title}`}
      >
        {active && (
          <div className="space-y-4 text-sm">
            <p>{active.summary}</p>
            {active.kind === 'phase' ? (
              <>
                <div>
                  <p className="font-semibold">Bài học · {active.time} <span className="font-normal text-muted-foreground">(bấm để xem lý thuyết và câu hỏi phỏng vấn)</span></p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                    {active.lessons.map((l) => (
                      <li key={l}>
                        <button type="button" className="text-left text-primary hover:underline" onClick={() => openLesson(l, active.lessonIds?.[l])}>
                          {l}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-secondary p-3 text-secondary-foreground">
                  <p className="font-semibold">Bài tập thực hành</p>
                  <p className="mt-1">{active.practice}</p>
                </div>
                <p><span className="font-semibold">Kết quả:</span> {active.outcome}</p>
              </>
            ) : (
              <>
                <div className="rounded-lg bg-secondary p-3 text-secondary-foreground">
                  <p className="font-semibold">Ví dụ</p>
                  <p className="mt-1">{active.example}</p>
                </div>
                <p><span className="font-semibold">Đầu ra:</span> {active.output}</p>
              </>
            )}
          </div>
        )}
      </Modal>

      <Drawer open={lessonOpen} onClose={() => setLessonOpen(false)} size={640} title={lesson}>
        {detail && (
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h3 className="text-base font-semibold">Lý thuyết</h3>
              <div className="mt-3 space-y-4">
                {detail.theory.map(([h, p]) => (
                  <div key={h}>
                    <p className="font-semibold">{h}</p>
                    <p className="mt-1 text-muted-foreground">{p}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-lg bg-secondary p-4 text-secondary-foreground">
              <p className="font-semibold">Ví dụ minh hoạ</p>
              <p className="mt-1">{detail.example}</p>
            </section>
            <section>
              <h3 className="text-base font-semibold">Câu hỏi phỏng vấn ({detail.qa.length})</h3>
              <Collapse
                className="mt-3"
                items={detail.qa.map(([q, a], i) => ({
                  key: i,
                  label: <span className="font-medium">{i + 1}. {q}</span>,
                  children: <p className="text-muted-foreground">{a}</p>,
                }))}
              />
            </section>
          </div>
        )}
      </Drawer>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 CapyTest · Lộ trình học tester với AI
      </footer>
    </div>
  );
}

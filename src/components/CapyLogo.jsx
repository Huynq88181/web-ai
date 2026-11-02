// Logo capybara: mặt capy + huy hiệu check (tester). Màu nâu chỉ dùng trong logo.
export default function CapyLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="CapyTest">
      <rect x="2" y="2" width="60" height="60" rx="18" fill="#E8E9FC" />
      <circle cx="18" cy="20" r="6" fill="#8A5A34" />
      <circle cx="46" cy="20" r="6" fill="#8A5A34" />
      <circle cx="18" cy="20" r="3" fill="#C99A6E" />
      <circle cx="46" cy="20" r="3" fill="#C99A6E" />
      <rect x="13" y="17" width="38" height="36" rx="16" fill="#B07A4B" />
      <rect x="18" y="33" width="28" height="18" rx="9" fill="#D2A67A" />
      <circle cx="24" cy="29" r="2.2" fill="#2A1A0E" />
      <circle cx="40" cy="29" r="2.2" fill="#2A1A0E" />
      <ellipse cx="28" cy="40" rx="1.7" ry="2.5" fill="#5A3A20" />
      <ellipse cx="36" cy="40" rx="1.7" ry="2.5" fill="#5A3A20" />
      <path d="M29 46q3 2.6 6 0" fill="none" stroke="#5A3A20" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="51" cy="51" r="9" fill="#141DD2" stroke="#fff" strokeWidth="2" />
      <path d="M46.8 51.2l3 3 5-6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

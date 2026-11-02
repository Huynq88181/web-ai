import SpotlightCard from '@/components/SpotlightCard';

// Card trắng 3 vùng: header / body / footer, ngăn cách bằng viền.
export default function Panel({ header, footer, children, onOpen, className = '' }) {
  return (
    <SpotlightCard
      theme="light"
      className={`flex h-full flex-col border !rounded-lg !p-0 ${onOpen ? 'cursor-pointer' : ''} ${className}`}
      {...(onOpen && {
        role: 'button', tabIndex: 0, onClick: onOpen,
        onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen()),
      })}
    >
      <div className="border-b px-5 py-4">{header}</div>
      <div className="flex-1 px-5 py-4">{children}</div>
      {footer && <div className="border-t bg-muted px-5 py-3 text-sm text-muted-foreground">{footer}</div>}
    </SpotlightCard>
  );
}

import { Children, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hàng card cuộn ngang: 3 card/hàng trên desktop, nút mũi tên ở góc phải tiêu đề.
export default function Carousel({ label, children }) {
  const ref = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = () => {
    const el = ref.current;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };
  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  const go = (dir) => ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.9, behavior: 'smooth' });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg font-medium">{label}</p>
        <div className="flex gap-2">
          <Button shape="circle" aria-label="Trước" disabled={edge.start} icon={<ChevronLeft size={16} />} onClick={() => go(-1)} />
          <Button shape="circle" aria-label="Sau" disabled={edge.end} icon={<ChevronRight size={16} />} onClick={() => go(1)} />
        </div>
      </div>
      <div ref={ref} onScroll={sync} className="flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Children.map(children, (c) => (
          <div className="shrink-0 basis-full snap-start sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]">{c}</div>
        ))}
      </div>
    </div>
  );
}

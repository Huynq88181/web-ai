// Production phải đặt PUBLIC_API_URL; chỉ dev mới mặc định về localhost.
export const API = import.meta.env.PUBLIC_API_URL || (import.meta.env.DEV ? 'http://localhost:8080' : '');

const idOf = (store, key) => {
  try {
    let v = store.getItem(key);
    if (!v) {
      v = crypto.randomUUID();
      store.setItem(key, v);
    }
    return v;
  } catch {
    return 'anon';
  }
};

// Gửi sự kiện về server theo dõi; lỗi mạng bị bỏ qua để không ảnh hưởng trang.
export const track = (type, payload) =>
  !API ? undefined : fetch(`${API}/api/track`, {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId: idOf(localStorage, 'capy_vid'),
      sessionId: idOf(sessionStorage, 'capy_sid'),
      type,
      path: location.pathname,
      referrer: document.referrer.slice(0, 300),
      payload,
    }),
  }).catch(() => {});

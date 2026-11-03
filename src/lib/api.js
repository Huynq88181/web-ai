import { API } from '@/lib/track';

const get = (path) => {
  if (!API) return Promise.reject(new Error('API chưa cấu hình'));
  return fetch(`${API}${path}`).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });
};

// Lấy khoá học đầu tiên kèm chặng và bài học.
export const fetchCourse = async () => {
  const [first] = await get('/api/courses');
  return get(`/api/courses/${first.id}`);
};

export const fetchLesson = (id) => get(`/api/lessons/${id}`);

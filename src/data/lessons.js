import l1 from './lessons1';
import l2 from './lessons2';
import l3 from './lessons3';
import q1 from './qa1';
import q2 from './qa2';
import q3 from './qa3';

const lessons = { ...l1, ...l2, ...l3 };
const extra = { ...q1, ...q2, ...q3 };

// Gộp câu hỏi bổ sung vào qa của từng bài
Object.keys(extra).forEach((k) => {
  lessons[k] = { ...lessons[k], qa: [...lessons[k].qa, ...extra[k]] };
});

export default lessons;

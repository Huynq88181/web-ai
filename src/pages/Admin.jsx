import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Input, Statistic, Table } from 'antd';
import CapyLogo from '@/components/CapyLogo';
import Panel from '@/components/Panel';
import { API } from '@/lib/track';

const KEY = 'capy_admin_token';
const read = () => { try { return sessionStorage.getItem(KEY) || ''; } catch { return ''; } };

// Cột có thanh ngang tỷ lệ theo giá trị lớn nhất.
const bar = (max) => (v) => (
  <div className="flex items-center gap-2">
    <div className="h-2 rounded bg-primary" style={{ width: `${(v / (max || 1)) * 120}px` }} />
    {v}
  </div>
);

export default function Admin() {
  const [token, setToken] = useState(read);
  const [draft, setDraft] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/admin/stats`, { headers: { 'X-Admin-Token': token } });
      if (res.status === 401) throw new Error('Token không đúng');
      if (!res.ok) throw new Error(`Lỗi server (${res.status})`);
      setStats(await res.json());
      setError('');
    } catch (e) {
      setStats(null);
      setError(e.message === 'Failed to fetch' ? 'Không kết nối được server theo dõi' : e.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return undefined;
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [token, load]);

  const login = () => {
    try { sessionStorage.setItem(KEY, draft); } catch { /* chỉ mất việc nhớ token */ }
    setToken(draft);
  };
  const logout = () => {
    try { sessionStorage.removeItem(KEY); } catch { /* bỏ qua */ }
    setToken('');
    setStats(null);
  };

  const today = stats?.last14Days.find((d) => d.date === new Date().toISOString().slice(0, 10));
  const maxDay = Math.max(0, ...(stats?.last14Days.map((d) => d.views) ?? []));
  const topCols = (max) => [
    { title: 'Tên', dataIndex: 'key' },
    { title: 'Lượt mở', dataIndex: 'total', width: 220, render: bar(max) },
  ];
  const maxOf = (rows = []) => Math.max(0, ...rows.map((r) => r.total));

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2 font-semibold"><CapyLogo size={36} /> CapyTest · Theo dõi truy cập</a>
          {token && <Button onClick={logout}>Đăng xuất</Button>}
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-5 py-8">
        {!token ? (
          <div className="mx-auto max-w-sm">
            <Panel header={<p className="font-semibold">Đăng nhập quản trị</p>}>
              <div className="space-y-3">
                <Input.Password placeholder="Admin token" value={draft} onChange={(e) => setDraft(e.target.value)} onPressEnter={login} />
                <Button type="primary" block disabled={!draft} onClick={login}>Vào xem</Button>
              </div>
            </Panel>
          </div>
        ) : (
          <>
            {error && <Alert type="error" showIcon title={error} />}
            {stats && (
              <>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                  {[
                    ['Người truy cập (tổng)', stats.totalVisitors],
                    ['Lượt xem (tổng)', stats.totalViews],
                    ['Người truy cập hôm nay', today?.visitors ?? 0],
                    ['Lượt xem hôm nay', today?.views ?? 0],
                  ].map(([title, value]) => (
                    <Panel key={title} header={<span className="text-sm text-muted-foreground">{title}</span>}>
                      <Statistic value={value} />
                    </Panel>
                  ))}
                </div>

                <Panel header={<p className="font-semibold">14 ngày gần nhất</p>} footer="Giờ theo UTC. Tự cập nhật mỗi 30 giây.">
                  <Table
                    size="small" pagination={false} rowKey="date"
                    dataSource={[...stats.last14Days].reverse()}
                    columns={[
                      { title: 'Ngày', dataIndex: 'date' },
                      { title: 'Lượt xem', dataIndex: 'views', width: 220, render: bar(maxDay) },
                      { title: 'Người truy cập', dataIndex: 'visitors' },
                    ]}
                  />
                </Panel>

                <div className="grid gap-5 md:grid-cols-2">
                  <Panel header={<p className="font-semibold">Bài học được mở nhiều nhất</p>}>
                    <Table size="small" pagination={false} rowKey="key" dataSource={stats.topLessons} columns={topCols(maxOf(stats.topLessons))} />
                  </Panel>
                  <Panel header={<p className="font-semibold">Chặng được mở nhiều nhất</p>}>
                    <Table size="small" pagination={false} rowKey="key" dataSource={stats.topPhases} columns={topCols(maxOf(stats.topPhases))} />
                  </Panel>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

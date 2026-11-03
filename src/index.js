import './index.css';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { antdTheme } from './styles/theme';
import Landing from './pages/Landing';
import Admin from './pages/Admin';

createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={antdTheme}>
    {location.pathname.startsWith('/admin') ? <Admin /> : <Landing />}
  </ConfigProvider>
);

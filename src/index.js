import './index.css';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { antdTheme } from './styles/theme';
import Landing from './pages/Landing';

createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={antdTheme}>
    <Landing />
  </ConfigProvider>
);

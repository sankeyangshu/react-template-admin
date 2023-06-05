import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.less'; // 导入默认样式
import '@/lang'; // 导入国际化
import 'virtual:svg-icons-register'; // svg-icons注册导入

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

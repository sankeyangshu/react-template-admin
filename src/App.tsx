import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { HashRouter } from 'react-router-dom';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import Router from './routers';

// 获取暗黑主题和默认主题
const { darkAlgorithm, defaultAlgorithm } = theme;

const isDark = false;

const App = () => {
  // Ant Design主题变量
  const antdTheme: ThemeConfig = {
    // 亮色/暗色配置
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
  };

  return (
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;

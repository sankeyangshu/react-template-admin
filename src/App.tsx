import { useEffect, useState } from 'react';
import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { HashRouter } from 'react-router-dom';
import { useSettingStore } from '@/store/setting';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import Router from './routers';

// 获取暗黑主题和默认主题
const { darkAlgorithm, defaultAlgorithm } = theme;

const App = () => {
  // 获取全局状态管理仓库中系统设置状态
  const isDark = useSettingStore((state) => state.themeConfig.isDark);

  // Ant Design主题变量
  const [antdTheme, setAntdTheme] = useState<ThemeConfig>({});

  useEffect(() => {
    setAntdTheme({
      algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
    });
  }, [isDark]);

  return (
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;

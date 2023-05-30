import { useEffect, useState } from 'react';
import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { HashRouter } from 'react-router-dom';
import { useSettingStore } from '@/store/setting';
import { useTheme } from '@/hooks/useTheme';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import Router from './routers';

// 获取暗黑主题和默认主题
const { darkAlgorithm, defaultAlgorithm } = theme;

const App = () => {
  // 获取全局状态管理仓库中系统设置状态
  const isDark = useSettingStore((state) => state.themeConfig.isDark);

  // 获取主题色
  const themeColor = useSettingStore((state) => state.themeConfig.themeColor);

  // Ant Design主题变量
  const [antdTheme, setAntdTheme] = useState<ThemeConfig>({});

  // 初始化主题
  const { initTheme } = useTheme();
  initTheme();

  useEffect(() => {
    setAntdTheme({
      algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
      token: {
        colorPrimary: themeColor,
      },
    });
  }, [isDark, themeColor]);

  return (
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;

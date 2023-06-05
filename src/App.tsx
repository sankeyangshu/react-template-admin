import { useEffect, useState } from 'react';
import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { HashRouter } from 'react-router-dom';
import { useSettingStore } from '@/store/setting';
import { useTheme } from '@/hooks/useTheme';
import { getBrowserLang } from '@/utils';
import type { Locale } from 'antd/es/locale';
import 'dayjs/locale/zh-cn';
import i18n from 'i18next';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
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

  // 获取全局设置中国际化语言默认值
  const language = useSettingStore((state) => state.language);

  // 国际化
  const [locale, setLocale] = useState<Locale>(zhCN);

  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果全局中有默认语言就设置成默认语言，没有默认语言就设置成浏览器默认语言
    if (language) {
      return setLocale(language === 'zhCn' ? zhCN : enUS);
    } else {
      return setLocale(getBrowserLang() === 'zhCn' ? zhCN : enUS);
    }
  };

  useEffect(() => {
    // 全局使用国际化
    i18n.changeLanguage(language);
    setAntdLanguage();
  }, [language]);

  return (
    <ConfigProvider locale={locale} theme={antdTheme}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;

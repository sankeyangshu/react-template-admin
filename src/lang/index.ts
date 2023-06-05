import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enUsTrans from './modules/en';
import zhCnTrans from './modules/zh-cn';

// 默认使用的语言
const locale = 'zhCn';

// 创建i18n实例
i18n.use(initReactI18next).init({
  // 语言配置文件
  resources: {
    en: {
      translation: enUsTrans,
    },
    zhCn: {
      translation: zhCnTrans,
    },
  },
  fallbackLng: locale, // 选择默认语言，选择内容为上述配置中的 key，即 en/zhCn
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

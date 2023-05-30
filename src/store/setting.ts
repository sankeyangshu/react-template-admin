import { create } from 'zustand';
import { DEFAULT_THEMECOLOR } from '@/config';

/**
 * 主题设置类型
 */
interface themeConfigType {
  showSetting: boolean;
  themeColor: string;
  isDark: boolean;
  isGrey: boolean;
  isWeak: boolean;
  showTag: boolean;
  fixedHeader: boolean;
  showLogo: boolean;
  uniqueOpened: boolean;
}

/**
 * 主题设置key类型
 */
export type themeConfigKeyType = keyof themeConfigType;

/**
 * 系统设置store类型
 */
export interface settingsStoreType {
  isCollapse: boolean;
  language: string;
  isReload: boolean;
  themeConfig: themeConfigType;
  setCollapse: (value: boolean) => void;
  setLanguage: (value: string) => void;
  setReload: () => void;
  setThemeConfig: (key: themeConfigKeyType, val: string | boolean) => void;
}

export const useSettingStore = create<settingsStoreType>()((set, get) => ({
  isCollapse: false, // 是否收缩左侧菜单栏
  language: 'zhCn', // 国际化-默认是zhCn
  isReload: true, // 是否刷新当前页
  themeConfig: {
    showSetting: false, // 显示设置
    themeColor: DEFAULT_THEMECOLOR, // 主题颜色-默认是#1890ff
    isDark: false, // 深色模式 切换暗黑模式
    isGrey: false, // 灰色模式
    isWeak: false, // 色弱模式
    showTag: true, // tagsView 是否展示 默认展示
    fixedHeader: true, // 固定header
    showLogo: true, // 显示侧边栏Logo
    uniqueOpened: true, // 是否只保持一个子菜单的展开
  }, // 主题设置

  // 设置左侧菜单的展开与收缩
  setCollapse: (value: boolean) => set({ isCollapse: value }),

  // 设置国际化
  setLanguage: (value: string) => set({ language: value }),

  // 刷新当前页
  setReload: () => {
    set({ isReload: false });
    setTimeout(() => {
      set({ isReload: true });
    }, 50);
  },

  // 设置主题
  setThemeConfig: (key: themeConfigKeyType, val: string | boolean) => {
    const { themeConfig } = get();
    const res = Object.assign(themeConfig, { [key]: val });

    set({
      themeConfig: res,
    });
  },
}));

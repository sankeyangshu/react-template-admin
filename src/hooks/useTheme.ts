import { useSettingStore } from '@/store/setting';

/**
 * @description: 全局主题设置
 */
export const useTheme = () => {
  // 获取全局状态管理仓库中系统设置状态
  const themeConfig = useSettingStore((state) => state.themeConfig);

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement;

    if (themeConfig.isDark) {
      body.setAttribute('class', 'dark');
    } else {
      body.setAttribute('class', '');
    }
  };

  // 初始化主题
  const initTheme = () => {
    switchDark();
  };

  return {
    switchDark,
    initTheme,
  };
};

import { useSettingStore } from '@/store/setting';

/**
 * 灰色和弱色key类型
 */
type GreyOrWeakType = 'grey' | 'weak';

/**
 * @description: 全局主题设置
 */
export const useTheme = () => {
  // 获取全局状态管理仓库中系统设置状态
  const themeConfig = useSettingStore((state) => state.themeConfig);
  const setThemeConfig = useSettingStore((state) => state.setThemeConfig);

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement;

    if (themeConfig.isDark) {
      body.setAttribute('class', 'dark');
    } else {
      body.setAttribute('class', '');
    }
  };

  // 灰色和弱色切换
  const changeGreyOrWeak = (type: GreyOrWeakType, value: boolean) => {
    const body = document.body;

    // 切换灰色或弱色
    const propName = type === 'grey' ? 'isGrey' : 'isWeak';
    setThemeConfig(propName, value);

    // 设置灰色或弱色样式
    if (!value) return body.removeAttribute('style');
    const styles: Record<GreyOrWeakType, string> = {
      grey: 'filter: grayscale(1)',
      weak: 'filter: invert(80%)',
    };
    body.setAttribute('style', styles[type]);

    // 防止灰色和弱色同时开启导致样式丢失，同一时间内，只能开启灰色或弱色
    const prop = type === 'grey' ? 'isWeak' : 'isGrey';
    setThemeConfig(prop, false);
  };

  // 初始化主题
  const initTheme = () => {
    switchDark();

    // 判断是否是灰色模式
    if (themeConfig.isGrey) changeGreyOrWeak('grey', true);

    // 判断是否色弱模式
    if (themeConfig.isWeak) changeGreyOrWeak('weak', true);
  };

  return {
    switchDark,
    initTheme,
    changeGreyOrWeak,
  };
};

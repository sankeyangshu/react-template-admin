import { Switch } from 'antd';
import { useSettingStore } from '@/store/setting';
import { useTheme } from '@/hooks/useTheme';
import SvgIcon from '@/components/SvgIcon';

const SwitchDark = () => {
  // 获取全局状态管理仓库中系统设置状态
  const themeConfig = useSettingStore((state) => state.themeConfig);
  const setThemeConfig = useSettingStore((state) => state.setThemeConfig);

  // 获取切换暗黑模式hooks
  const { switchDark } = useTheme();

  // 切换暗黑模式
  const onChange = (checked: boolean) => {
    setThemeConfig('isDark', checked);
    switchDark();
  };

  return (
    <Switch
      className="dark"
      defaultChecked={themeConfig.isDark}
      checkedChildren={<SvgIcon icon="Sunny" />}
      unCheckedChildren={<SvgIcon icon="Moon" />}
      onChange={onChange}
    />
  );
};

export default SwitchDark;

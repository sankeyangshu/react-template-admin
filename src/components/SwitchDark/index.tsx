import { Switch } from 'antd';
import SvgIcon from '@/components/SvgIcon';

const SwitchDark = () => {
  const isDark = false;

  // 切换暗黑模式
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Switch
      className="dark"
      defaultChecked={isDark}
      checkedChildren={<SvgIcon icon="Sunny" />}
      unCheckedChildren={<SvgIcon icon="Moon" />}
      onChange={onChange}
    />
  );
};

export default SwitchDark;

import { FC, useState } from 'react';
import { Divider, Drawer, Tooltip, Switch, ColorPicker } from 'antd';
import { FireOutlined, SettingOutlined } from '@ant-design/icons';
import { useSettingStore } from '@/store/setting';
import { useTheme } from '@/hooks/useTheme';
import { DEFAULT_THEMECOLOR } from '@/config';
import { useTranslation } from 'react-i18next';
import SwitchDark from '@/components/SwitchDark';

const Setting: FC = () => {
  // 是否显示系统设置抽屉
  const [visible, setVisible] = useState(false);

  // 显示右侧抽屉
  const onClickShowDrawer = () => {
    setVisible(true);
  };

  // 全局仓库中主题设置方法
  const setThemeConfig = useSettingStore((state) => state.setThemeConfig);

  // 预定义主题颜色
  const colorList = [
    DEFAULT_THEMECOLOR,
    '#009688',
    '#daa96e',
    '#0c819f',
    '#27ae60',
    '#ff5c93',
    '#e74c3c',
    '#fd726d',
    '#f39c12',
    '#9b59b6',
  ];

  // 默认主题色
  const themeColor = useSettingStore((state) => state.themeConfig.themeColor);

  // 是否是灰色模式
  const isGrey = useSettingStore((state) => state.themeConfig.isGrey);

  // 是否是色弱模式
  const isWeak = useSettingStore((state) => state.themeConfig.isWeak);

  // 获取切换灰色和色弱模式hooks
  const { changeGreyOrWeak } = useTheme();

  // 使用i18n全局函数
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t('navBar.setting')}>
        <SettingOutlined className="icon-style" onClick={onClickShowDrawer} />
      </Tooltip>
      <Drawer
        title={t('navBar.setting')}
        placement="right"
        closable={false}
        width={320}
        open={visible}
        onClose={() => setVisible(false)}
      >
        {/* 全局主题 */}
        <Divider className="divider">
          <FireOutlined />
          全局主题
        </Divider>
        <div className="theme-item">
          <span>主题颜色</span>
          <ColorPicker
            value={themeColor}
            presets={[
              {
                label: 'Recommended',
                colors: colorList,
              },
            ]}
            onChange={(value) => {
              setThemeConfig('themeColor', value.toHexString());
            }}
          />
        </div>
        <div className="theme-item">
          <span>暗黑模式</span>
          <SwitchDark />
        </div>
        <div className="theme-item">
          <span>灰色模式</span>
          <Switch
            checked={isGrey}
            onChange={(e) => {
              changeGreyOrWeak('grey', e);
            }}
          />
        </div>
        <div className="theme-item">
          <span>色弱模式</span>
          <Switch
            checked={isWeak}
            onChange={(e) => {
              changeGreyOrWeak('weak', e);
            }}
          />
        </div>
      </Drawer>
    </>
  );
};

export default Setting;

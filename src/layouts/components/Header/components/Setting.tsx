import { FC, useState } from 'react';
import { Divider, Drawer, Tooltip } from 'antd';
import { FireOutlined, SettingOutlined } from '@ant-design/icons';
import SwitchDark from '@/components/SwitchDark';

const Setting: FC = () => {
  // 是否显示系统设置抽屉
  const [visible, setVisible] = useState(false);

  // 显示右侧抽屉
  const onClickShowDrawer = () => {
    setVisible(true);
  };

  return (
    <>
      <Tooltip title="系统设置">
        <SettingOutlined className="icon-style" onClick={onClickShowDrawer} />
      </Tooltip>
      <Drawer
        title="系统设置"
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
          <span>暗黑模式</span>
          <SwitchDark />
        </div>
      </Drawer>
    </>
  );
};

export default Setting;

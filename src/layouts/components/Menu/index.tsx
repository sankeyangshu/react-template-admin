import { useState } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { ContainerOutlined, DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { useSettingStore } from '@/store/setting';
import type { MenuProps } from 'antd';
import Logo from './components/Logo';
import './index.less';

// 获取菜单组件
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// TODO: 测试数据
const menuList: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
];

const LayoutMenu = () => {
  // 获取全局状态管理仓库中系统设置状态
  const isCollapse = useSettingStore((state) => state.isCollapse);

  // 加载状态
  const [loading] = useState(false);

  return (
    <Sider trigger={null} theme="dark" width={220} collapsible collapsed={isCollapse}>
      <div className="layout-menu">
        <Spin spinning={loading} tip="Loading...">
          <Logo isCollapse={isCollapse}></Logo>
          <Menu theme="dark" mode="inline" triggerSubMenuAction="click" items={menuList}></Menu>
        </Spin>
      </div>
    </Sider>
  );
};

export default LayoutMenu;

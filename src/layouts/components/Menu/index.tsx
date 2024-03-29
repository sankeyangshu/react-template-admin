import * as antdIcons from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Spin } from 'antd';
import { createElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { constantRoutes } from '@/routers';
import type { RouteObject } from '@/routers/routeType';
import { useSettingStore } from '@/store/setting';
import { filterRoutes, getOpenKeys, isNull } from '@/utils/routers';
import Logo from './components/Logo';
import './index.less';

// 获取菜单组件
const { Sider } = Layout;

/**
 * menu 类型
 */
type MenuItem = Required<MenuProps>['items'][number];

const LayoutMenu = () => {
  // 使用i18n全局函数
  const { t } = useTranslation();

  // menu item
  const getItem = (
    label: React.ReactNode,
    key?: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label: t(`route.${label}`),
      type,
    } as MenuItem;
  };

  // 获取全局状态管理仓库中系统设置状态
  const isCollapse = useSettingStore((state) => state.isCollapse);

  // 获取路径
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname]);
    isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
  }, [pathname, isCollapse]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  // 点击当前菜单跳转路由
  const navigate = useNavigate();
  const onClickMenuLink: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key);
  };

  // 菜单列表
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  // 加载状态
  const [loading] = useState(false);

  // antd icons
  const customIcons: { [key: string]: any } = antdIcons;

  /**
   * 动态渲染 Icon 图标
   * @param name 图标名
   */
  const addIcon = (name: string | undefined) => {
    if (name) {
      return createElement(customIcons[name]);
    }
    // 如果图标不存在，返回默认图标
    return createElement(antdIcons.AppstoreOutlined);
  };

  /**
   * @description: 根据routes数据，返回对应的menu规则数据
   * @param {RouteObject[]} routes
   * @return 对应的menu规则数据
   */
  const generateMenus = (routes: RouteObject[]) => {
    const result: MenuItem[] = [];
    // 不满足条件：meta && meta.title && meta.icon 的数据不应该存在
    routes.forEach((item) => {
      // 不存在children && meta ，或不需要展示在侧边栏，直接返回
      if ((isNull(item.children) && isNull(item.meta)) || item.hidden) return;
      // 存在meta，不存在children
      if (isNull(item.children) && !isNull(item.meta)) {
        return result.push(getItem(item.meta?.title, item.path, addIcon(item.meta?.icon)));
      }
      // 存在children，也存在meta
      // 如果只有一个子元素
      if (!isNull(item.children) && item.children?.length === 1) {
        const child = item.children[0];
        const title = child.meta?.title || item.meta?.title;
        const path = child.path || item.path;
        const icon = child.meta?.icon || item.meta?.icon;
        return result.push(getItem(title, path, addIcon(icon)));
      }
      result.push(
        getItem(
          item.meta?.title,
          item.path,
          addIcon(item.meta?.icon),
          generateMenus(item.children as RouteObject[])
        )
      );
    });
    return result;
  };

  // 获取菜单列表
  const getMenuList = () => {
    const fRoutes = filterRoutes(constantRoutes);
    setMenuList(generateMenus(fRoutes));
  };

  // 初始化菜单列表
  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <Sider trigger={null} theme="dark" width={220} collapsible collapsed={isCollapse}>
      <div className="layout-menu">
        <Spin spinning={loading} tip="Loading...">
          <Logo isCollapse={isCollapse}></Logo>
          <Menu
            theme="dark"
            mode="inline"
            triggerSubMenuAction="click"
            items={menuList}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClickMenuLink}
          ></Menu>
        </Spin>
      </div>
    </Sider>
  );
};

export default LayoutMenu;

import { createElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { constantRoutes } from '@/routers';
import { generateRoutes, generateRoutesType, searchRoute } from '@/utils/routers';
import { HOME_URL } from '@/config';
import * as antdIcons from '@ant-design/icons';
import './index.less';

const TagsView = () => {
  // 使用i18n全局函数
  const { t } = useTranslation();

  // antd icons
  const customIcons: { [key: string]: any } = antdIcons;

  // 获取路由对象
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 标签列表
  const [tabsList, setTabsList] = useState<generateRoutesType[]>([]);

  // 当前选中的标签
  const [activeValue, setActiveValue] = useState<string>(pathname);

  // 添加 导航标签
  const addTabs = () => {
    // 当前访问的路由对象
    const route = searchRoute(pathname, constantRoutes);
    // 所有的路由-路由数组
    const cRoute = generateRoutes(constantRoutes);
    // 选中的标签数组
    const newTabsList: generateRoutesType[] = [...tabsList];

    // 判断标签数组中是否存在目前所处的路由，如果没有，添加进去
    if (
      newTabsList.every((item) => item.path !== route.path) &&
      cRoute.some((item) => item.path === route.path)
    ) {
      newTabsList.push({
        title: route.meta!.title,
        path: route.path,
        icon: route.meta?.icon,
        affix: route.meta?.affix,
      });
    }
    setTabsList(newTabsList);
    setActiveValue(pathname);
  };

  // 点击标签页-tab 被选中时触发
  const onTabClick = (path: string) => {
    navigate(path);
  };

  // 移除标签页-点击 tab 移除按钮时触发
  const onRemoveTab = (tabPath: React.MouseEvent | React.KeyboardEvent | string) => {
    if (tabPath === HOME_URL) return;

    if (pathname === tabPath) {
      tabsList.forEach((item, index) => {
        if (item.path !== pathname) return;

        // 删除以后切换到下一个
        const nextTab = tabsList[index + 1] || tabsList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.path!);
      });
    }

    setTabsList(tabsList.filter((item) => item.path !== tabPath));
  };

  useEffect(() => {
    addTabs();
  }, [pathname]);

  return (
    <>
      <div className="tags-view">
        <Tabs
          animated
          hideAdd
          type="editable-card"
          activeKey={activeValue}
          onChange={onTabClick}
          onEdit={onRemoveTab}
          items={
            tabsList &&
            tabsList.map((item) => {
              return {
                label: (
                  <span>
                    {item.path === HOME_URL
                      ? createElement(antdIcons.HomeFilled)
                      : createElement(customIcons[item.icon!])}
                    {t(`route.${item.title}`)}
                  </span>
                ),
                key: item.path as string,
                closable: !item.affix,
              };
            })
          }
        />
        <div className="tags-action">{/* <MoreButton /> */}</div>
      </div>
    </>
  );
};

export default TagsView;

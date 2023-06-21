import { createElement, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { constantRoutes } from '@/routers';
import { generateRoutes, searchRoute } from '@/utils/routers';
import { HOME_URL } from '@/config';
import { useTagsViewStore } from '@/store/tagsView';
import MoreButton from './components/MoreButton';
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

  // 获取全局标签数据
  const [activeTabsValue, visitedViews, setTabsMenuValue, addView, removeView, toLastView] =
    useTagsViewStore((state) => [
      state.activeTabsValue,
      state.visitedViews,
      state.setTabsMenuValue,
      state.addView,
      state.removeView,
      state.toLastView,
    ]);

  // 添加 导航标签
  const addTabs = () => {
    // 当前访问的路由对象
    const route = searchRoute(pathname, constantRoutes);
    // 所有的路由-路由数组
    const cRoute = generateRoutes(constantRoutes);

    // 判断标签数组中是否存在目前所处的路由，如果没有，添加进去
    if (cRoute.some((item) => item.path === route.path)) {
      addView(route);
    }
  };

  // 初始化标签数组
  useEffect(() => {
    addTabs();
  }, [pathname]);

  // 选中标签页
  const setCurrentTag = useCallback(() => {
    // 当前访问的路由对象
    const route = searchRoute(pathname, constantRoutes);

    const tag = visitedViews.find((item) => {
      if (route) {
        return item.meta?.title === route.meta?.title;
      } else {
        return item.path === pathname;
      }
    });

    if (tag) setTabsMenuValue(tag.meta!.title);
  }, [pathname, visitedViews]);

  // 点击标签页-tab 被选中时触发
  const onTabClick = (path: string) => {
    const tag = visitedViews.find((item) => item.path === path);
    if (tag) {
      setCurrentTag();
      navigate(path);
    }
  };

  // 移除标签页-点击 tab 移除按钮时触发
  const onRemoveTab = async (tabPath: React.MouseEvent | React.KeyboardEvent | string) => {
    if (tabPath === HOME_URL) return;

    if (pathname === tabPath) {
      // 删除以后切换到下一个
      const nextTab = await toLastView(tabPath);
      if (nextTab) {
        navigate(nextTab.path!);
      }
    }

    removeView(tabPath as string);
  };

  return (
    <>
      <div className="tags-view">
        <Tabs
          animated
          hideAdd
          type="editable-card"
          activeKey={activeTabsValue}
          onChange={onTabClick}
          onEdit={onRemoveTab}
          items={
            visitedViews &&
            visitedViews.map((item) => {
              return {
                label: (
                  <span>
                    {item.path === HOME_URL
                      ? createElement(antdIcons.HomeFilled)
                      : createElement(customIcons[item.meta!.icon!])}
                    {t(`route.${item.meta?.title}`)}
                  </span>
                ),
                key: item.path as string,
                closable: !item.meta?.affix,
              };
            })
          }
        />
        <div className="tags-action">
          <MoreButton />
        </div>
      </div>
    </>
  );
};

export default TagsView;

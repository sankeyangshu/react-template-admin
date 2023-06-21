import { create } from 'zustand';
import { RouteObject } from '@/routers/routeType';
import { HOME_URL } from '@/config';

/**
 * 标签 state type
 */
interface tagsViewStateType {
  activeTabsValue: string;
  visitedViews: RouteObject[];
}

interface tagsViewActionType {
  setTabsMenuValue: (value: string) => void;
  addView: (view: RouteObject) => void;
  removeView(path: string): void;
  toLastView(activeTabPath: string): Promise<RouteObject | null>;
  clearVisitedView(): void;
  delAllViews(): void;
  delOtherViews(path: string): void;
}

export const useTagsViewStore = create<tagsViewStateType & tagsViewActionType>()((set, get) => ({
  activeTabsValue: HOME_URL, // 选中的tagsView
  visitedViews: [], // 选中过的路由表

  // 选中tagsView
  setTabsMenuValue(val: string) {
    set({
      activeTabsValue: val,
    });
  },

  // 新增tagsView
  addView(view: RouteObject) {
    const { visitedViews, setTabsMenuValue } = get();
    setTabsMenuValue(view.path!);
    if (visitedViews.some((v) => v.path === view.path) || !view.meta) return;

    visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name',
      })
    );
  },

  // 移除tagsView
  removeView(path: string) {
    const { visitedViews } = get();
    if (visitedViews.length) {
      set({
        visitedViews: visitedViews.filter((item) => item.path !== path),
      });
    }
  },

  // 删除以后切换到下一个
  toLastView(activeTabPath: string) {
    return new Promise((resolve) => {
      const { visitedViews, addView } = get();
      const index = visitedViews.findIndex((item) => item.path === activeTabPath);
      const nextTab = visitedViews[index + 1] || visitedViews[index - 1];
      if (nextTab) {
        addView(nextTab);
        resolve(nextTab);
      }
      resolve(null);
    });
  },
  clearVisitedView() {
    const { delAllViews } = get();
    delAllViews();
  },

  // 删除全部标签
  delAllViews() {
    const { visitedViews } = get();
    set({
      visitedViews: visitedViews.filter((v) => v.meta && v.meta.affix),
    });
  },

  // 删除其他标签
  delOtherViews(path: string) {
    const { visitedViews } = get();
    set({
      visitedViews: visitedViews.filter((item) => {
        return item.path === path || (item.meta && item.meta.affix);
      }),
    });
  },
}));

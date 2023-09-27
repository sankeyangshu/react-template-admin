import path from 'path-browserify';
import i18n from '@/lang';
import { RouteObject } from '@/routers/routeType';
import { isNull } from './routers';

/**
 * 筛选完路由对象类型
 */
export interface filterRouteType {
  path: string;
  title: string[];
}

/**
 * @description: 筛选出可供搜索的路由对象
 * @param {RouteRecordRaw[]} routes 路由表
 * @param {string} basePath 基础路由，默认为 /
 * @param {string[]} prefixTitle 路由名称
 * @return 筛选完的路由对象
 */
export const generateRoutes = (
  routes: RouteObject[],
  basePath = '/',
  prefixTitle: string[] = []
) => {
  // 创建 result 数据
  let res: filterRouteType[] = [];
  routes.forEach((route) => {
    // 不存在children && meta ，或不需要展示在侧边栏，直接返回
    if ((isNull(route.children) && isNull(route.meta)) || route.hidden) return;

    // 如果只有一个子元素并且不存在path
    if (!route.path && route.children) {
      const child = route.children[0];
      const i18nTitle = i18n.t(`route.${child.meta?.title}`);
      res.push({
        path: path.resolve(basePath, child.path!),
        title: [i18nTitle],
      });
    }

    if (route.path) {
      // 创建包含 path 和 title 的item
      const data = {
        path: path.resolve(basePath, route.path),
        title: [...prefixTitle],
      };

      // 当前存在 meta 时，使用i18n进行国际化解析，组合成新的title
      // 当动态路由不允许被检索
      const regex = /.*\/:.*/;
      if (route.meta && route.meta.title && !regex.exec(route.path)) {
        const i18nTitle = i18n.t(`route.${route.meta.title}`);
        data.title = [...data.title, i18nTitle];
        res.push(data);
      }

      // 存在 children 时，迭代调用
      if (route.children) {
        const tempRoutes = generateRoutes(route.children, data.path, data.title);
        if (tempRoutes && tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes];
        }
      }
    }
  });

  return res;
};

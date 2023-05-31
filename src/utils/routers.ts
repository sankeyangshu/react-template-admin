import { RouteObject } from '@/routers/routeType';

/**
 * @description: 返回所有子路由
 * @param {RouteObject[]} routes 路由数组
 * @return 子路由数组
 */
const getChildrenRoutes = (routes: RouteObject[]) => {
  const result: RouteObject[] = [];
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children);
    }
  });
  return result;
};

/**
 * @description: 判断数据是否为空值
 * @param {any} data 数据
 * @return 判断结果-是否为空
 */
export const isNull = (data: any) => {
  if (!data) return true;
  if (JSON.stringify(data) === '{}') return true;
  if (JSON.stringify(data) === '[]') return true;
  return false;
};

/**
 * @description: 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {RouteObject[]} routes
 * @return 符合条件的路由
 */
export const filterRoutes = (routes: RouteObject[]) => {
  console.log('🚀 ~ file: routers.ts:36 ~ filterRoutes ~ routes:', routes);
  const childrenRoutes = getChildrenRoutes(routes);
  console.log('🚀 ~ file: routers.ts:37 ~ filterRoutes ~ childrenRoutes:', childrenRoutes);
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path;
    });
  });
};

/**
 * @description 获取需要展开的 subMenu
 * @param {string} path 当前访问地址
 * @returns 展开后的subMenu
 */
export const getOpenKeys = (path: string) => {
  let newStr = '';
  const newArr: string[] = [];
  const arr = path.split('/').map((i) => '/' + i);
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i];
    newArr.push(newStr);
  }
  return newArr;
};

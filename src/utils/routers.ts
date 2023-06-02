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
  const childrenRoutes = getChildrenRoutes(routes);
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

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * @param {string} path 当前访问地址
 * @param {RouteObject[]} menuList 菜单列表
 * @returns 面包屑导航列表
 */
export const getBreadcrumbList = (path: string, menuList: RouteObject[]) => {
  const tempPath: RouteObject[] = [];
  try {
    const getNodePath = (node: RouteObject) => {
      tempPath.push(node);

      // 找到符合条件的节点，通过throw终止掉递归
      if (node.path === path) {
        throw new Error('GOT IT!');
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        tempPath.pop();
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        tempPath.pop();
      }
    };
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    // 筛选路由名称数组，将数组中为空的项删除，以确保返回的数组对象正确
    const temp = tempPath
      .map((item) => {
        if (item.meta) {
          return item.meta.title;
        }
        return '';
      })
      .filter((val) => val !== '');
    // 返回数组最后一项，最后一项为该路由正确的名称
    return temp[temp.length - 1];
  }
};

/**
 * @description 筛选路由列表，找出符合条件的面包屑列表
 * @param {string} routes 当前路由列表
 * @returns 面包屑列表
 */
export const findAllBreadcrumb = (routes: RouteObject[]): { [key: string]: string } => {
  const handleBreadcrumbList: any = {};
  const loop = (menuItem: RouteObject) => {
    // 不存在children && meta ，或不需要展示在侧边栏，直接返回
    if ((isNull(menuItem.children) && isNull(menuItem.meta)) || menuItem.hidden) return;

    // 下面判断代码解释 *** !item?.children?.length   ==>   (item.children && item.children.length > 0)
    if (menuItem?.children?.length) {
      menuItem.children.forEach((item) => loop(item));
      if (!menuItem.path) return;
      handleBreadcrumbList[menuItem.path] = getBreadcrumbList(menuItem.path, routes);
    } else {
      handleBreadcrumbList[menuItem.path!] = getBreadcrumbList(menuItem.path!, routes);
    }
  };
  routes.forEach((item) => loop(item));
  return handleBreadcrumbList;
};

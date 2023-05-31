import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { RouteObject } from './routeType';
import lazyLoad from './utils/lazyLoad';
import Layout from '@/layouts';
import systemRoutes from './modules/system';

// 异步路由表
export const asyncRoutes: RouteObject[] = [...systemRoutes];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
  path: '*',
  title: 'notFound',
  element: lazyLoad(lazy(() => import('@/views/ErrorPages/404'))),
};

/**
 * 公共路由
 */
export const constantRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: lazyLoad(lazy(() => import('@/views/Home'))),
        meta: { title: '首页', key: 'Home', affix: true },
      },
    ],
  },
  {
    path: '/login',
    element: lazyLoad(lazy(() => import('@/views/Login'))),
  },
  {
    path: '/403',
    hidden: true,
    element: lazyLoad(lazy(() => import('@/views/ErrorPages/403'))),
  },
  ...asyncRoutes,
  notFoundRouter,
];

// 创建一个可以被 React 应用程序使用的路由实例
const router = () => {
  const routes = useRoutes(constantRoutes);
  return routes;
};

export default router;

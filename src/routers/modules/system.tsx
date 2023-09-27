import { lazy } from 'react';
import Layout from '@/layouts';
import { RouteObject } from '../routeType';
import lazyLoad from '../utils/lazyLoad';

/**
 * 系统设置路由
 */
const systemRoutes: Array<RouteObject> = [
  {
    path: '/system',
    element: <Layout />,
    meta: {
      title: 'system',
      icon: 'SettingOutlined',
    },
    children: [
      {
        path: '/system/user',
        element: lazyLoad(lazy(() => import('@/views/System/Users'))),
        meta: { title: 'userManage', icon: 'MenuOutlined', key: 'User' },
      },
      {
        path: '/system/role',
        element: lazyLoad(lazy(() => import('@/views/System/Roles'))),
        meta: { title: 'roleManage', icon: 'MenuOutlined', key: 'Roles' },
      },
      {
        path: '/system/menu',
        element: lazyLoad(lazy(() => import('@/views/System/Menus'))),
        meta: { title: 'menuManage', icon: 'MenuOutlined', key: 'Menus' },
      },
      {
        path: '/system/dept',
        element: lazyLoad(lazy(() => import('@/views/System/Depts'))),
        meta: { title: 'deptManage', icon: 'MenuOutlined', key: 'dept' },
      },
    ],
  },
];

export default systemRoutes;

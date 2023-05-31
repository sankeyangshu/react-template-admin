import { lazy } from 'react';
import { RouteObject } from '../routeType';
import lazyLoad from '../utils/lazyLoad';
import Layout from '@/layouts';

/**
 * 系统设置路由
 */
const systemRoutes: Array<RouteObject> = [
  {
    path: '/system',
    element: <Layout />,
    meta: {
      title: '管理',
      icon: 'SettingOutlined',
    },
    children: [
      {
        path: '/system/user',
        element: lazyLoad(lazy(() => import('@/views/System/Users'))),
        meta: { title: '用户管理', icon: 'MenuOutlined', key: 'User' },
      },
      {
        path: '/system/role',
        element: lazyLoad(lazy(() => import('@/views/System/Roles'))),
        meta: { title: '角色管理', icon: 'MenuOutlined', key: 'Roles' },
      },
      {
        path: '/system/menu',
        element: lazyLoad(lazy(() => import('@/views/System/Menus'))),
        meta: { title: '菜单管理', icon: 'MenuOutlined', key: 'Menus' },
      },
      {
        path: '/system/dept',
        element: lazyLoad(lazy(() => import('@/views/System/Depts'))),
        meta: { title: '部门管理', icon: 'MenuOutlined', key: 'dept' },
      },
    ],
  },
];

export default systemRoutes;

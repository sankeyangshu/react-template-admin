import { useRoutes, RouteObject } from 'react-router-dom';
import Login from '@/views/Login';
import LayoutMain from '@/layouts';
import NotFound from '@/views/ErrorPages/404';
import NotAuth from '@/views/ErrorPages/403';

/**
 * 公共路由
 * path ==> 路由路径
 * element ==> 路由组件
 */
export const constantRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutMain />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/403',
    element: <NotAuth />,
  },
];

// 创建一个可以被 React 应用程序使用的路由实例
const router = () => {
  const routes = useRoutes(constantRoutes);
  return routes;
};

export default router;

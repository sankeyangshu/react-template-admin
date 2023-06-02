import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { findAllBreadcrumb } from '@/utils/routers';
import { constantRoutes } from '@/routers';

const BreadcrumbNav = () => {
  // 获取路由对象
  const { pathname } = useLocation();
  const pathSnippets = pathname.split('/').filter((i) => i);

  // 获取筛选后的面包屑数组
  const breadcrumbData = findAllBreadcrumb(constantRoutes);

  // 符合条件的面包屑对象数组
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    // 面包屑最后一项不可点击
    const title =
      Number(index + 1) === pathSnippets.length ? (
        breadcrumbData[url]
      ) : (
        <Link to={url}>{breadcrumbData[url]}</Link>
      );

    return {
      key: url,
      title,
    };
  });

  return <Breadcrumb items={extraBreadcrumbItems} />;
};

export default BreadcrumbNav;

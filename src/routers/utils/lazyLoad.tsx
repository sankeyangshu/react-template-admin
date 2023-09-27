import { Spin } from 'antd';
import React, { Suspense } from 'react';

/**
 * @description: 路由懒加载
 * @param {Element} Component 需要访问的组件
 * @return element
 */
const lazyLoad = (Component: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        />
      }
    >
      <Component />
    </Suspense>
  );
};

export default lazyLoad;

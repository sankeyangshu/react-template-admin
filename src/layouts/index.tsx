import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import LayoutMenu from './components/Menu';
import LayoutHeader from './components/Header';
import LayoutTabs from './components/TagsView';
import './index.less';

// 获取内容组件
const { Content } = Layout;

const LayoutMain = () => {
  return (
    <Layout className="layout-container">
      {/* 侧边导航 */}
      <LayoutMenu></LayoutMenu>

      <Layout>
        {/* 头部导航 */}
        <LayoutHeader></LayoutHeader>

        {/* 操作栏 */}
        <LayoutTabs></LayoutTabs>

        {/* 内容区域 */}
        <Content>
          <Outlet></Outlet>
        </Content>

        {/* 底部 Footer */}
        {/* <LayoutFooter></LayoutFooter> */}
      </Layout>
    </Layout>
  );
};

export default LayoutMain;

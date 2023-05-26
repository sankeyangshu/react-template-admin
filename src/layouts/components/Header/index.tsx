import { Layout } from 'antd';
import User from './components/User';
import './index.less';

// 获取头部组件
const { Header } = Layout;

const LayoutHeader = () => {
  return (
    <Header>
      <div className="header-left"></div>
      <div className="header-right">
        {/* 用户信息 */}
        <User />
      </div>
    </Header>
  );
};

export default LayoutHeader;

import { Layout } from 'antd';
import User from './components/User';
import Setting from './components/Setting';
import ScreenFull from './components/ScreenFull';
import Notice from './components/Notice';
import './index.less';

// 获取头部组件
const { Header } = Layout;

const LayoutHeader = () => {
  return (
    <Header>
      <div className="header-left"></div>
      <div className="header-right">
        {/* 全屏 */}
        <ScreenFull />
        {/* 通知 */}
        <Notice />
        {/* 设置 */}
        <Setting />
        {/* 用户信息 */}
        <User />
      </div>
    </Header>
  );
};

export default LayoutHeader;

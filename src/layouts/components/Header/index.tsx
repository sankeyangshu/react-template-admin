import { Layout } from 'antd';
import User from './components/User';
import Setting from './components/Setting';
import ScreenFull from './components/ScreenFull';
import ComponentSize from './components/ComponentSize';
import LangSelect from './components/LangSelect';
import Notice from './components/Notice';
import CollapseIcon from './components/CollapseIcon';
import BreadcrumbNav from './components/Breadcrumb';
import HeaderSearch from './components/HeaderSearch';
import './index.less';

// 获取头部组件
const { Header } = Layout;

const LayoutHeader = () => {
  return (
    <Header>
      <div className="header-left">
        <CollapseIcon />
        <BreadcrumbNav />
      </div>
      <div className="header-right">
        {/* 菜单搜索 */}
        <HeaderSearch />
        {/* 全屏 */}
        <ScreenFull />
        {/* 组件尺寸切换 */}
        <ComponentSize />
        {/* 国际化 */}
        <LangSelect />
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

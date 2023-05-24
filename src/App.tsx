import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import Router from './routers';

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;

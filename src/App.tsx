import { useState } from 'react';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <div style={{ width: 400, margin: '100px auto' }}>
        <div>hello world</div>
      </div>
    </ConfigProvider>
  );
};

export default App;

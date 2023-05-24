import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import SwitchDark from '@/components/SwitchDark';
import welcome from '@/assets/images/welcome.png';
import logo from '@/assets/images/logo.png';
import './index.less';

const Login = () => {
  const [form] = Form.useForm();

  // 按钮加载状态
  const [loading] = useState(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      {/* 暗黑模式切换 开始 */}
      <SwitchDark />
      {/* 暗黑模式切换 结束 */}

      <div className="login-box">
        <div className="login-welcome">
          <img src={welcome} alt="welcome" />
        </div>
        <div className="login-form">
          <div className="login-logo">
            <img className="login-icon" src={logo} alt="logo" />
            <span className="logo-text">React-Admin</span>
          </div>

          {/* 登录功能 开始 */}
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
            autoComplete="off"
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item className="login-btn">
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
          {/* 登录功能 结束 */}
        </div>
      </div>
    </div>
  );
};

export default Login;

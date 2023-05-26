import { Avatar, Space, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const User = () => {
  // 下拉菜单
  const menuList: MenuProps['items'] = [
    {
      key: '1',
      label: <span className="dropdown-item">个人信息</span>,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: <span className="dropdown-item">修改密码</span>,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: <span className="dropdown-item">退出登录</span>,
    },
  ];

  // 头像
  const avatar = 'https://img.yzcdn.cn/vant/cat.jpeg';

  return (
    <>
      <Dropdown menu={{ items: menuList }} placement="bottom" arrow trigger={['click']}>
        <Space>
          <Avatar size="large" src={avatar} />
          <div>User</div>
          <DownOutlined />
        </Space>
      </Dropdown>
    </>
  );
};

export default User;

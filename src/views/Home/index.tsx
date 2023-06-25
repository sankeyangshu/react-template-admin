import { Avatar, Card } from 'antd';
import { getTimeStateStr, welcome } from '@/utils';
import moduleCss from './index.module.less';

const Home = () => {
  // 头像
  const avatarUrl = 'https://img.yzcdn.cn/vant/cat.jpeg';

  return (
    <>
      <div className={moduleCss.home}>
        <Card hoverable>
          <div className={moduleCss['page-header']}>
            <Avatar size={64} src={avatarUrl} />
            <div className={moduleCss['page-header-tip']}>
              <p className={moduleCss['page-header-tip-title']}>
                {`${getTimeStateStr()} xxx，${welcome()}`}
              </p>
              <p className={moduleCss['page-header-tip-desc']}>React-Admin后台管理系统</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Home;

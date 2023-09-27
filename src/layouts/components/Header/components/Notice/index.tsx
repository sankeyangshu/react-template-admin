import { BellOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Badge, Popover, Tabs, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/logo.png';
import noMessage from '@/assets/images/noMessage.png';
import moduleCss from './index.module.less';

/**
 * 通知组件
 */
const noticeItem = (
  <div className={moduleCss['message-list']}>
    <div className={moduleCss['message-item']}>
      <img src={logo} alt="" className={moduleCss['message-img']} />
      <div className={moduleCss['message-content']}>
        <span className={moduleCss['message-title']}>这是一个通知！！！</span>
        <span className={moduleCss['message-date']}>一分钟前</span>
      </div>
    </div>
  </div>
);

/**
 * 暂无消息组件
 */
const noMessageItem = (
  <div className={moduleCss['message-empty']}>
    <img src={noMessage} alt="notData" className={moduleCss['message-noImg']} />
    <div>暂无消息</div>
  </div>
);

// 切换tab
const onChange = (key: string) => {
  console.log(key);
};

// tab选项卡列表
const tabItems: TabsProps['items'] = [
  {
    key: 'first',
    label: `通知(5)`,
    children: noticeItem,
  },
  {
    key: 'second',
    label: `消息(0)`,
    children: noMessageItem,
  },
  {
    key: 'third',
    label: `代办(0)`,
    children: noMessageItem,
  },
];

// tab标签
const tabsContent = <Tabs defaultActiveKey="first" items={tabItems} onChange={onChange} />;

const Notice = () => {
  // 使用i18n全局函数
  const { t } = useTranslation();

  return (
    <>
      <Popover content={tabsContent} placement="bottom" trigger="click">
        <Tooltip title={t('navBar.notice')} placement="bottom">
          <Badge count={5} className="icon-style">
            <BellOutlined />
          </Badge>
        </Tooltip>
      </Popover>
    </>
  );
};

export default Notice;

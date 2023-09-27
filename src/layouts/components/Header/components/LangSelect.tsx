import type { MenuProps } from 'antd';
import { Dropdown, message, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import { useSettingStore } from '@/store/setting';

const LangSelect = () => {
  // 获取全局设置中国际化默认值
  const language = useSettingStore((state) => state.language);
  const setLanguage = useSettingStore((state) => state.setLanguage);

  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();

  // 使用i18n全局函数
  const { t } = useTranslation();

  // 切换语言状态
  const onHandleSetLanguage = (lang: string) => {
    setLanguage(lang);
    messageApi.open({
      type: 'success',
      content: lang === 'en' ? 'Switch Language Success' : '切换语言成功',
    });
  };

  // 下拉菜单
  const menuList: MenuProps['items'] = [
    {
      key: 'zhCn',
      label: <span className="dropdown-item"> 简体中文 </span>,
      disabled: language === 'zhCn',
      onClick: ({ key }) => onHandleSetLanguage(key),
    },
    {
      type: 'divider',
    },
    {
      key: 'en',
      label: <span className="dropdown-item"> English </span>,
      disabled: language === 'en',
      onClick: ({ key }) => onHandleSetLanguage(key),
    },
  ];

  return (
    <>
      {/* 全局提示 */}
      {contextHolder}
      <Dropdown menu={{ items: menuList }} placement="bottom" arrow trigger={['click']}>
        <Tooltip title={t('navBar.lang')}>
          <span className="icon-style">
            <SvgIcon icon="Language" />
          </span>
        </Tooltip>
      </Dropdown>
    </>
  );
};

export default LangSelect;

import type { MenuProps } from 'antd';
import { Dropdown, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import { componentSizeType, useSettingStore } from '@/store/setting';

const ComponentSize = () => {
  // 获取全局设置中国际化默认值
  const [componentSize, setComponentSize] = useSettingStore((state) => [
    state.componentSize,
    state.setComponentSize,
  ]);

  // 使用i18n全局函数
  const { t } = useTranslation();

  // 切换组件尺寸
  const onChangeComponentSize = (size: componentSizeType) => {
    setComponentSize(size);
  };

  // 下拉菜单
  const menuList: MenuProps['items'] = [
    {
      key: 'middle',
      label: <span className="dropdown-item"> {t('componentSize.middle')} </span>,
      disabled: componentSize === 'middle',
      onClick: ({ key }) => onChangeComponentSize(key as componentSizeType),
    },
    {
      type: 'divider',
    },
    {
      key: 'large',
      label: <span className="dropdown-item"> {t('componentSize.large')} </span>,
      disabled: componentSize === 'large',
      onClick: ({ key }) => onChangeComponentSize(key as componentSizeType),
    },
    {
      type: 'divider',
    },
    {
      key: 'small',
      label: <span className="dropdown-item"> {t('componentSize.small')} </span>,
      disabled: componentSize === 'small',
      onClick: ({ key }) => onChangeComponentSize(key as componentSizeType),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items: menuList }} placement="bottom" arrow trigger={['click']}>
        <Tooltip title={t('navBar.componentSize')}>
          <span className="icon-style">
            <SvgIcon icon="ComponentSize" />
          </span>
        </Tooltip>
      </Dropdown>
    </>
  );
};

export default ComponentSize;

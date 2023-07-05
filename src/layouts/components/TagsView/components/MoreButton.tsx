import { useLocation, useNavigate } from 'react-router-dom';
import { CloseOutlined, DownOutlined, ReloadOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSettingStore } from '@/store/setting';
import { useTagsViewStore } from '@/store/tagsView';
import { HOME_URL } from '@/config';
import type { MenuProps } from 'antd';
import SvgIcon from '@/components/SvgIcon';

const MoreButton = () => {
  // 使用i18n全局函数
  const { t } = useTranslation();

  // 路由
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 获取全局设置中刷新方法
  const setReload = useSettingStore((state) => state.setReload);
  const [removeView, delOtherViews, delAllViews, toLastView] = useTagsViewStore((state) => [
    state.removeView,
    state.delOtherViews,
    state.delAllViews,
    state.toLastView,
  ]);

  // 关闭当前页面
  const onCloseCurrentTab = async (tabPath: string) => {
    if (tabPath === HOME_URL) return;

    // 删除以后切换到下一个
    const nextTab = await toLastView(tabPath);
    if (nextTab) {
      navigate(nextTab.path!);
    }

    removeView(tabPath);
  };

  // 关闭其他页面
  const onCloseOtherTab = (tabPath: string) => {
    delOtherViews(tabPath);
  };

  // 关闭所有页面，去首页
  const onCloseAllTab = () => {
    delAllViews();
    navigate(HOME_URL);
  };

  // 菜单
  const items: MenuProps['items'] = [
    {
      label: (
        <span>
          <ReloadOutlined style={{ marginRight: '10px' }} />
          {t('tagsView.refresh')}
        </span>
      ),
      key: '1',
      onClick: () => setReload(),
    },
    {
      label: (
        <span>
          <span style={{ marginRight: '10px' }}>
            <SvgIcon icon="FolderRemove" />
          </span>
          {t('tagsView.closeCurrent')}
        </span>
      ),
      key: '2',
      onClick: () => onCloseCurrentTab(pathname),
    },
    {
      label: (
        <span>
          <CloseOutlined style={{ marginRight: '10px' }} />
          {t('tagsView.closeOther')}
        </span>
      ),
      key: '3',
      onClick: () => onCloseOtherTab(pathname),
    },
    {
      label: (
        <span>
          <span style={{ marginRight: '10px' }}>
            <SvgIcon icon="FolderDelete" />
          </span>
          {t('tagsView.closeAll')}
        </span>
      ),
      key: '4',
      onClick: () => onCloseAllTab(),
    },
  ];

  return (
    <>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        trigger={['click']}
        arrow={{ pointAtCenter: true }}
      >
        <Button className="more-button" type="primary" size="small">
          {t('tagsView.more')}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default MoreButton;

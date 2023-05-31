import { useSettingStore } from '@/store/setting';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const CollapseIcon = () => {
  // 获取全局设置中菜单收缩状态
  const isCollapse = useSettingStore((state) => state.isCollapse);
  const setCollapse = useSettingStore((state) => state.setCollapse);

  // 收缩/展开
  const onClickHandleCollapse = () => {
    setCollapse(!isCollapse);
  };

  return (
    <div className="collapsed" onClick={onClickHandleCollapse}>
      {isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
    </div>
  );
};

export default CollapseIcon;

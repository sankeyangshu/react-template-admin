import { useState } from 'react';
import { Tooltip, Modal, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

// TODO: 待国际化完成后，在完成模糊搜索
const HeaderSearch = () => {
  // 是否显示搜索弹出框
  const [isShowSearchModal, setIsShowSearchModal] = useState(false);

  /**
   * 显示/隐藏搜索框
   */
  const onClickShowSearch = () => {
    setIsShowSearchModal(!isShowSearchModal);
  };

  // 使用i18n全局函数
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t('navBar.headerSearch')}>
        <SearchOutlined className="icon-style" onClick={onClickShowSearch} />
      </Tooltip>
      <Modal
        open={isShowSearchModal}
        width={600}
        closable={false}
        footer={null}
        destroyOnClose={false}
        onCancel={onClickShowSearch}
        className="headerSearch"
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          size="large"
          placeholder="菜单搜索 ：支持菜单名称、路径"
          filterOption={false}
          showArrow={false}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Modal>
    </>
  );
};

export default HeaderSearch;

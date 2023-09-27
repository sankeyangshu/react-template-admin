import { SearchOutlined } from '@ant-design/icons';
import { Modal, Select, Tooltip } from 'antd';
import Fuse from 'fuse.js'; // https://fusejs.io/ fuse.js文档
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { constantRoutes } from '@/routers';
import { filterRouteType, generateRoutes } from '@/utils/FuseData';

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

  // 数据源
  const searchPool = generateRoutes(constantRoutes);

  /**
   * 搜索库相关
   */
  let fuse: Fuse<filterRouteType>;

  /**
   * @description: 初始化fuse模糊搜索配置
   * @param {filterRouteType[]} searchPool 搜索的数据源
   */
  const initFuse = (searchPool: filterRouteType[]) => {
    fuse = new Fuse(searchPool, {
      // 是否按优先级进行排序
      shouldSort: true,
      // 匹配长度超过这个值的才会被认为是匹配的
      minMatchCharLength: 1,
      // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
      // name：搜索的键
      // weight：对应的权重
      keys: [
        {
          name: 'title',
          weight: 0.7,
        },
        {
          name: 'path',
          weight: 0.3,
        },
      ],
    });
  };

  // 初始化fuse
  initFuse(searchPool);

  // 搜索结果
  const [searchOptions, setSearchOptions] = useState<{ label: string; value: string }[]>([]);

  /**
   * @description: 搜索方法
   * @param {string} query 搜索值
   */
  const querySearch = (query: string) => {
    const list = fuse.search(query).map((res) => {
      return {
        label: res.item.title.join(' > '),
        value: res.item.path,
      };
    });
    if (query !== '') {
      setSearchOptions(list);
    } else {
      setSearchOptions([]);
    }
  };

  // 搜索关键词
  const [search] = useState<string>();

  // 路由跳转
  const navigate = useNavigate();

  /**
   * @description: 选中搜索结果-并跳转到具体页面
   * @param {string} val 路由对象
   */
  const onChangeSelect = (val: string) => {
    navigate(val);
  };

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
          value={search}
          style={{ width: '100%' }}
          size="large"
          placeholder={t('navBar.headerSearchText')}
          filterOption={false}
          showArrow={false}
          options={searchOptions}
          onSearch={querySearch}
          onChange={onChangeSelect}
        />
      </Modal>
    </>
  );
};

export default HeaderSearch;

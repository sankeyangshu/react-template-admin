/**
 * 路由元信息
 */
export interface MetaType {
  /**
   * 路由标题
   */
  title: string;

  /**
   * 菜单icon
   */
  icon?: string;

  /**
   * 固钉-如果设置为true将会出现在 标签栏中
   */
  affix?: boolean;

  /**
   * 路由key
   */
  key?: string;

  /**
   * 如果设置为false，该项将隐藏在breadcrumb中
   */
  breadcrumb?: boolean;

  /**
   * keepAlive ==> 设为true 缓存
   */
  keepAlive?: boolean;

  /**
   * 是否需要验证权限
   */
  requiresAuth?: boolean;
}

/**
 * 路由
 */
export interface RouteObject {
  /**
   * 路由路径
   */
  path?: string;

  /**
   * 路由组件
   */
  element?: React.ReactNode;

  /**
   *
   */
  caseSensitive?: boolean;

  /**
   * 子路由
   */
  children?: RouteObject[];

  /**
   * 路由元信息
   */
  meta?: MetaType;

  /**
   *  如果“hidden:true”不会显示在侧边栏中
   */
  hidden?: boolean;

  /**
   * keepAlive ==> 设为true 缓存
   */
  keepAlive?: boolean;

  /**
   * 是否跳转
   */
  isLink?: string;
}

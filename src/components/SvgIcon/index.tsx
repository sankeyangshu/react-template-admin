import './index.less';

interface SvgProps {
  icon: string; // 图标的名称 ==> 必传
  className?: { [key: string]: any }; // 图标的样式 ==> 非必传
}

const SvgIcon = (props: SvgProps) => {
  /**
   * svg图标类名
   */
  const svgClass = props.className ? 'svg-icon ' + props.className : 'svg-icon';

  /**
   * 项目内图标
   */
  const iconName = props.icon ? `#icon-${props.icon}` : '#icon';

  return (
    <svg aria-hidden="true" className={svgClass}>
      <use href={iconName} />
    </svg>
  );
};

export default SvgIcon;

import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { message, Tooltip } from 'antd';
import { createElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import screenfull from 'screenfull';

const ScreenFull = () => {
  // 使用i18n全局函数
  const { t } = useTranslation();

  // 是否全屏和切换方法
  const [isFullscreen, { setTrue, setFalse }] = useBoolean(screenfull.isFullscreen);

  // 全屏切换
  const onClickToggleScreenFull = () => {
    if (!screenfull.isEnabled) {
      message.warning('当前您的浏览器不支持全屏 ❌');
    }
    screenfull.toggle();
  };

  // 监听 screenfull 变化
  const changeScreenFull = () => {
    if (screenfull.isFullscreen) setTrue();
    else setFalse();
  };

  useEffect(() => {
    // 组件挂载时调用
    if (screenfull.isEnabled) {
      // 设置侦听器
      screenfull.on('change', changeScreenFull);
    }

    return () => {
      // 组件卸载时调用
      if (screenfull.isEnabled) {
        // 删除侦听器
        screenfull.off('change', changeScreenFull);
      }
    };
  }, []);

  return (
    <>
      <Tooltip title={!isFullscreen ? t('navBar.screenfull') : t('navBar.screenfullRetract')}>
        {createElement(isFullscreen ? FullscreenExitOutlined : FullscreenOutlined, {
          className: 'icon-style',
          onClick: onClickToggleScreenFull,
        })}
      </Tooltip>
    </>
  );
};

export default ScreenFull;

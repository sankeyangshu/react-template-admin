import { NavLink } from 'react-router-dom';
import errorBg from '@/assets/images/404_bg.png';
import errorCloud from '@/assets/images/error_cloud.png';
import moduleCss from './index.module.less';

const NotFound = () => {
  return (
    <div className={moduleCss['app-container']}>
      <div className={moduleCss['app-container-inner']}>
        <div className={moduleCss['http-container']}>
          <div className={moduleCss['http']}>
            <div className={moduleCss['http-img']}>
              <img className={moduleCss['img-parent']} src={errorBg} alt="404" />
              <img
                className={`${moduleCss['img-child']} ${moduleCss.left}`}
                src={errorCloud}
                alt="404"
              />
              <img
                className={`${moduleCss['img-child']} ${moduleCss.mid}`}
                src={errorCloud}
                alt="404"
              />
              <img
                className={`${moduleCss['img-child']} ${moduleCss.right}`}
                src={errorCloud}
                alt="404"
              />
            </div>
            <div className={moduleCss['http-btn']}>
              <div className={moduleCss['btn-noauth']}>页面不存在！</div>
              <div className={moduleCss['btn-info']}>请检查URL地址是否正确, 或点击回到首页。</div>
              <NavLink to={{ pathname: '/' }} className={moduleCss.btn}>
                回到首页
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

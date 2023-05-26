import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.png';

interface propsType {
  isCollapse: boolean;
}

const Logo: FC<propsType> = (props) => {
  const { isCollapse } = props;

  return (
    <Link to={{ pathname: '/' }}>
      <div className="logo-box">
        <img src={logo} className="logo-img" alt="logo" />
        {!isCollapse && <h2 className="logo-text">React-Admin</h2>}
      </div>
    </Link>
  );
};

export default Logo;

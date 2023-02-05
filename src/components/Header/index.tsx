import { useWhyDidYouUpdate } from 'ahooks';
import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoSvg from '../../assets/img/pizza-logo.svg';
import { Input } from '../Input';
import { CartHeader } from './CartHeader';

export const Header: React.FC = memo(() => {
  const { pathname } = useLocation();

  return (
    <div className='header'>
      <div className='container'>
        <Link to='/'>
          <div className='header__logo'>
            <img width='38' src={logoSvg} alt='Pizza logo' />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {pathname !== '/cart' && (
          <>
            <Input />
            <CartHeader />
          </>
        )}
      </div>
    </div>
  );
});

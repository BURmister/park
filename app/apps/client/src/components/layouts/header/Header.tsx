import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useLocate } from '../../../hooks/useLocate';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { isLoggedIn, logout } from '../../../redux/slices/auth/auth.slice';

import styles from './Header.module.scss';
import logo from '../../../assets/cloud.svg';

const pages = [
   { id: '/', value: 'Главная' },
   { id: '/events', value: 'События' },
   { id: '/news', value: 'Новости' },
   { id: '/history', value: 'История' },
   { id: '/about', value: 'О Парке' },
];

const Header: FC = () => {
   const locate = useLocate();
   const isUser = useAppSelector(isLoggedIn);
   const dispatch = useAppDispatch();

   let found = pages.find((item) => item.id.toLowerCase() === locate.pathname.toLowerCase());

   // TODO
   // if (locate.pathname.includes('/users/edit')) {
   //    found = { id: '/users/edit', value: 'Измените сотрудника' };
   // }

   return (
      <header>
         <div className={styles.wrapper}>
            <Link to="/">
               <img src={logo} />
               <h2>Парк</h2>
            </Link>
            {/* <h2>{found ? found.value : 'Страница не существует'}</h2> */}
            <nav>
               <ul>
                  {pages.map((item, index) => (
                     <li key={index} className={locate.pathname.toLowerCase() === item.id.toLowerCase() ? `${styles.activePage}` : ''}>
                        <Link to={item.id}>{item.value}</Link>
                     </li>
                  ))}
               </ul>
            </nav>
            {isUser ? (
               <button type="button" onClick={() => dispatch(logout())}>
                  <span>Bыйти</span>
               </button>
            ) : null}
         </div>
      </header>
   );
};

export default Header;

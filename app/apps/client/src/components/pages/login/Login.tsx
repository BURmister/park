import { FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { isLoggedIn, login as loginUser } from '../../../redux/slices/auth/auth.slice';

import styles from './Login.module.scss';

const Login: FC = () => {
   const isUser = useAppSelector(isLoggedIn);

   const [login, setLogin] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const passwordRef = useRef<HTMLInputElement>(null);
   const dispatch = useAppDispatch();

   const navigate = useNavigate()

   const onEnter = () => {
      dispatch(loginUser({ name: login, password }));
   };

   useEffect(() => {
      isUser && navigate('/')
   }, [isUser])

   return (
      <div className={styles.wrapper}>
         <form>
            <h1>Войдите в систему</h1>
            <input type="text" placeholder="Логин" value={login} onChange={(event) => setLogin(event.target.value)} />
            <input placeholder="Пароль" ref={passwordRef} type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="button" onClick={() => onEnter()}>
               Войти
            </button>
         </form>
      </div>
   );
};

export default Login;

// TODO
// const history = useHistory();
// history.goBack();
// <button onClick={() => history.goBack()}>Back</button>;

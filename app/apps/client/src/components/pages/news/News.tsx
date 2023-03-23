import { FC, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { isLoggedIn } from '../../../redux/slices/auth/auth.slice';
import { fetchNews, filterNews, getNews } from '../../../redux/slices/news/news';
import AppContext from '../../../hooks/Context';

import styles from './News.module.scss';
import close from '../../../assets/close.svg';
import edit from '../../../assets/edit.svg';
import { deleteOneNews, deleteStatus, updateDeleteStatus } from '../../../redux/slices/news/deleteNews';

const News: FC = () => {
   const news = useAppSelector(getNews);
   const dispatch = useAppDispatch();

   const isUser = useAppSelector(isLoggedIn);
   const statusDelete = useAppSelector(deleteStatus);
   const { token } = useContext(AppContext);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Новости';
      dispatch(fetchNews());
   }, []);

   const onDelete = (_id: string) => {
      if (confirm('Вы уверены, что хотите удалить новость?')) {
         dispatch(deleteOneNews({ id: _id, token }));
         dispatch(filterNews(_id));
      }
   };

   useEffect(() => {
      if (statusDelete === 'success') {
         alert(`Новость успешно удалена`);
         dispatch(updateDeleteStatus('loading'));
      } else if (statusDelete === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateDeleteStatus('loading'));
      }
   }, [statusDelete]);

   return (
      <>
         <div className={styles.container}>
            <h1>Новости</h1>
            <section>
               {isUser ? <Link to="/news/add">+</Link> : null}

               {news.length !== 0 ? (
                  news.map((item, index) => (
                     <div key={index}>
                        {isUser ? (
                           <div>
                              <Link to={`/news/change/${item._id}`}>
                                 <img src={edit} />
                              </Link>
                              <button type="button" onClick={() => onDelete(item._id)}>
                                 <img src={close} />
                              </button>
                           </div>
                        ) : null}
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <span>{item.date}</span>
                     </div>
                  ))
               ) : (
                  <div>
                     <h2>
                        Пока новостей нет.
                        <br /> Как появятся - сразу расскажем!
                     </h2>
                  </div>
               )}
            </section>
         </div>
      </>
   );
};

export default News;

import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { isLoggedIn } from '../../../../redux/slices/auth/auth.slice';
import { fetchNews, getNews } from '../../../../redux/slices/news/news';

import styles from './News.module.scss';

const AddNews: FC = () => {
   const news = useAppSelector(getNews);
   const dispatch = useAppDispatch();

   const isUser = useAppSelector(isLoggedIn);

   const navigate = useNavigate();

   useEffect(() => {
      if (!isUser) {
         alert('You are not authenticated');
         return navigate('/');
      }
      window.scrollTo(0, 0);
      document.title = 'Новости';
      dispatch(fetchNews());
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>Добавить новость</h1>
            <section>

               {news.length !== 0 ? (
                  news.map((item, index) => (
                     <div key={index}>
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

export default AddNews;

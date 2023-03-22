import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { isLoggedIn } from '../../../redux/slices/auth/auth.slice';
import { fetchNews, getNews } from '../../../redux/slices/news/news';

import styles from './News.module.scss';
import close from '../../../assets/close.svg'
import edit from '../../../assets/edit.svg'

const News: FC = () => {
   const news = useAppSelector(getNews);
   const dispatch = useAppDispatch();

   const isUser = useAppSelector(isLoggedIn);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Новости';
      dispatch(fetchNews());
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>Новости</h1>
            <section>
               {isUser ? <Link to="/news/add">+</Link> : null}

               {news.length !== 0 ? (
                  news.map((item, index) => (
                     <div key={index}>
                        <div>
                           <Link to={`/news/change/${item._id}`}>
                              <img src={edit}/>
                           </Link>
                           <button type="button">
                              <img src={close}/>
                           </button>
                        </div>
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

import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchNews, getNews } from '../../../redux/slices/news/news';

import styles from './News.module.scss';

const News: FC = () => {
   const news = useAppSelector(getNews);
   const dispatch = useAppDispatch();

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Новости';
      dispatch(fetchNews())
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>Новости</h1>
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

export default News;

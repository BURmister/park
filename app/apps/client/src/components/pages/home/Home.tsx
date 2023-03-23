import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Slider from '../../ui/slider/Slider';
import useOutside from '../../../hooks/useOutside';
import Modal from '../../ui/modal-pay/Modal';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchNews, getNews } from '../../../redux/slices/news/news';
import { fetchProducts, getProducts } from '../../../redux/slices/products/products.slice';

import styles from './Home.module.scss';
import next from '../../../assets/next.svg';

const ARTICLES_LIMIT_ON_PAGE = 3;

const Home: FC = () => {
   const news = useAppSelector(getNews);
   const products = useAppSelector(getProducts);
   const dispatch = useAppDispatch();

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Парк';
      dispatch(fetchProducts(ARTICLES_LIMIT_ON_PAGE));
      dispatch(fetchNews(ARTICLES_LIMIT_ON_PAGE));
   }, []);

   const { ref, isShow, setIsShow } = useOutside(false);

   return (
      <div className={styles.wrapper}>
         <h1>Главная</h1>

         <section>
            <Slider img={''} />
         </section>
         <section>
            <Link to="/events">
               <h2>События</h2>
               <img src={next} />
            </Link>
            <ul>
               {products.length !== 0 ? (
                  products.map((item, index) => (
                     <li key={index}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <span>
                           Дата проведения: {item.date}
                           <br />
                           Время: {item.time}
                        </span>
                        {item.free === 'Бесплатное' ? null : (
                           <span ref={ref}>
                              <button type="button" onClick={() => setIsShow(!isShow)}>
                                 Билеты
                              </button>
                              <Modal
                                 _id={item._id}
                                 name={item.name}
                                 date={item.date}
                                 time={item.time}
                                 price={item.price}
                                 open={isShow}
                                 onClickOpen={() => setIsShow(!isShow)}
                                 ref={ref}
                              />
                           </span>
                        )}
                        <h4>
                           Посещение - <span>{item.free === 'Бесплатное' ? 'Бесплатное' : 'Платное'}</span>
                        </h4>
                     </li>
                  ))
               ) : (
                  <div>
                     <h3>
                        Пока событий нет.
                        <br /> Как появятся - сразу расскажем!
                     </h3>
                  </div>
               )}
            </ul>
         </section>
         <section>
            <Link to="/news">
               <h2>Новости</h2>
               <img src={next} />
            </Link>
            <ul>
               {news.length !== 0 ? (
                  news.map((item, index) => (
                     <li key={index}>
                        <h3>{item.name}</h3>
                        <span>{item.date}</span>
                     </li>
                  ))
               ) : (
                  <div>
                     <h3>
                        Пока новостей нет.
                        <br /> Как появятся - сразу расскажем!
                     </h3>
                  </div>
               )}
            </ul>
         </section>
         <section>
            <Link to="/info/pay">«Пушкинская карта» в Парке</Link>
            <Link to="/info/garden">Ботанический сад</Link>
            <Link to="/info/excursions">Пешеходные экскурсии</Link>
         </section>
      </div>
   );
};

export default Home;

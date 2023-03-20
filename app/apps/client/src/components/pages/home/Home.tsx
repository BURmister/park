import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Slider from '../../ui/slider/Slider';
import useOutside from '../../../hooks/useOutside';
import Modal from '../../ui/modal-pay/Modal';

import styles from './Home.module.scss';
import next from '../../../assets/next.svg';

const Home: FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Парк';
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
               <li>
                  <h3>Название / Заголовок события</h3>
                  <p>
                     какой-то текст события, который может быть как коротким, так и длинным. Хмм... Интересно, а как ограничивать текст при помощи JS
                     и ставить 3 точки
                  </p>
                  <span>
                     Дата: 23.04.2023 <br />
                     Время: 11:30
                  </span>
                  <h4>
                     Посещение - <span>Бесплатное</span>
                  </h4>
               </li>
               <li>
                  <h3>Название / Заголовок события</h3>
                  <p>
                     какой-то текст события, который может быть как коротким, так и длинным. Хмм... Интересно, а как ограничивать текст при помощи JS
                     и ставить 3 точки
                  </p>
                  <span>
                     Дата: 23.04.2023 <br />
                     Время: 11:30
                  </span>
                  <h4>
                     Посещение - <span>Бесплатное</span>
                  </h4>
               </li>
               <li ref={ref}>
                  <h3>Название / Заголовок события</h3>
                  <p>
                     какой-то текст события, который может быть как коротким, так и длинным. Хмм... Интересно, а как ограничивать текст при помощи JS
                     и ставить 3 точки
                  </p>
                  <span>
                     Дата: 23.04.2023 <br />
                     Время: 11:30
                  </span>
                  <h4>
                     Посещение - <span>Платное</span>
                  </h4>
                  <button type="button" onClick={() => setIsShow(!isShow)}>
                     Билеты
                  </button>
                  <Modal name={'Концерт Нервы в нашем Парке'} open={isShow} onClickOpen={() => setIsShow(!isShow)} ref={ref} />
               </li>
            </ul>
         </section>
         <section>
            <Link to="/news">
               <h2>Новости</h2>
               <img src={next} />
            </Link>
            <ul>
               <li>
                  <h3>Название / Заголовок события</h3>
                  <p>
                     какой-то текст события, который может быть как коротким, так и длинным. Хмм... Интересно, а как ограничивать текст при помощи JS
                     и ставить 3 точки
                  </p>
                  <span>23.04.2023</span>
               </li>
               <li>
                  <h3>Название / Заголовок события</h3>
                  <p>
                     какой-то текст события, который может быть как коротким, так и длинным. Хмм... Интересно, а как ограничивать текст при помощи JS
                     и ставить 3 точки
                  </p>
                  <span>23.04.2023</span>
               </li>
               <li>
                  <h3>Название / Заголовок события</h3>
                  <p>
                     какой-то текст события, который может быть как коротким, так и длинным. Хмм... Интересно, а как ограничивать текст при помощи JS
                     и ставить 3 точки
                  </p>
                  <span>23.04.2023</span>
               </li>
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

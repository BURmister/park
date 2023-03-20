import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Pay.module.scss';

const Pay: FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = '«Пушкинская карта»';
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>«Пушкинская карта» в Парке</h1>
            <section>
               <img src="https://prioklib.ru/wp-content/uploads/2022/06/%D0%91%D0%B0%D0%BD%D0%BD%D0%B5%D1%80-%D0%BF%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F-%D0%BA%D0%B0%D1%80%D1%82%D0%B0-1.jpg" />
               <p>
                  Парк подключен к программе «Пушкинская карта» — а это значит, что этой картой можно оплатить  <span>все</span> билеты на посещение любых наших
                  выставок, фильмов, музеев, событий!
               </p>
               <Link to="/events">Перейти к событиям</Link>
            </section>
         </div>
      </>
   );
};

export default Pay;

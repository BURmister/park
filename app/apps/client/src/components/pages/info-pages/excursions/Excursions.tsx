import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Excursions.module.scss';

const Excursions: FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = '«Пушкинская карта»';
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>Пешие экскурсии по всему Парку</h1>
            <section>
               <img src="https://www.zaryadyepark.ru/upload/medialibrary/00d/IMG_6841.JPG" />
               <p>
                  В Парке проводятся пешие экскурсии, которые может посетить любой желающий, как в группе, так и лично с экскурсоводом. Вас проведут
                  по всей территории парка, расскажут его историю, покажут все павильоны и поделятся всеми серкетами нашего парка!
               </p>
               <span>
                  Продолжительность: 1 час
                  <br />
                  Стоимость: 350 ₽
               </span>
               <button type="button">Купить билет</button>
            </section>
         </div>
      </>
   );
};

export default Excursions;

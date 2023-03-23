import { FC, useEffect } from 'react';

import useOutside from '../../../../hooks/useOutside';
import Modal from '../../../ui/modal-pay/Modal';

import styles from './Excursions.module.scss';

const WALK_EXCURSION_PRICE = '350'

const Excursions: FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Прогулки';
   }, []);

   const { ref, isShow, setIsShow } = useOutside(false);

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
                  Стоимость: {WALK_EXCURSION_PRICE} ₽
               </span>
               <div ref={ref}>
                  <button type="button" onClick={() => setIsShow(!isShow)}>
                     Купить билет
                  </button>
                  <Modal
                     _id={'Пешия экскурсия по Парку'}
                     name={'Пешия экскурсия по Парку'}
                     date={false}
                     time={false}
                     price={WALK_EXCURSION_PRICE}
                     open={isShow}
                     onClickOpen={() => setIsShow(!isShow)}
                     ref={ref}
                  />
               </div>
            </section>
         </div>
      </>
   );
};

export default Excursions;

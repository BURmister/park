import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useOutside from '../../../../hooks/useOutside';
import Modal from '../../../ui/modal-pay/Modal';

import styles from './Garden.module.scss';

const Garden: FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Ботанический сад';
   }, []);

   const { ref, isShow, setIsShow } = useOutside(false);

   return (
      <>
         <div className={styles.container}>
            <h1>Ботанический сад в Парке</h1>
            <section>
               <img src="https://www.zaryadyepark.ru/local/templates/.default/markup_zaryadye/new-markup/dest/assets/images/header-botanic__bg-main.jpg" />
               <p>
                  «Парк» — это дом для множества растений из разных уголков нашей страны: от лугов до смешанных лесов, от северных бескрайних
                  пространств до березовых рощ.
               </p>
               <p>
                  Посещение сада <span>бесплатное</span>. Но вы можете купить билет на экскурсию. Наш экскурсовод пройдет с вами по всему саду и
                  расскажет о всех расстениях, которые у нас есть!
               </p>
               <span>
                  Продолжительность: 1 час
                  <br />
                  Стоимость: 350 ₽
               </span>
               <div ref={ref}>
                  <button type="button" onClick={() => setIsShow(!isShow)}>
                     Купить билет
                  </button>
                  <Modal name={'Концерт Нервы в нашем Парке'} open={isShow} onClickOpen={() => setIsShow(!isShow)} ref={ref} />
               </div>{' '}
            </section>
         </div>
      </>
   );
};

export default Garden;

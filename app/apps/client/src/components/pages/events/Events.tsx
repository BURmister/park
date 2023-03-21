import { FC, useEffect } from 'react';
import useOutside from '../../../hooks/useOutside';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchProducts, getProducts } from '../../../redux/slices/products/products.slice';
import Modal from '../../ui/modal-pay/Modal';

import styles from './Events.module.scss';

const Events: FC = () => {
   const products = useAppSelector(getProducts);
   const dispatch = useAppDispatch();

   const { ref, isShow, setIsShow } = useOutside(false);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'События';
      dispatch(fetchProducts());
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>События</h1>
            <section>
               {products.length !== 0 ? (
                  products.map((item, index) => (
                     <div key={index}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <span>
                           Дата проведения: {item.date}
                           <br />
                           Время: {item.time}
                        </span>
                        <h3>
                           Посещение - <span>{item.free ? 'Бесплатное' : 'Платное'}</span>
                        </h3>
                        {item.free ? null : (
                           <span ref={ref}>
                              <button type="button" onClick={() => setIsShow(!isShow)}>
                                 Купить билеты
                              </button>
                              <Modal
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
                     </div>
                  ))
               ) : (
                  <div>
                     <h2>
                        Пока событий нет.
                        <br /> Как появятся - сразу расскажем!
                     </h2>
                  </div>
               )}
            </section>
         </div>
      </>
   );
};

export default Events;

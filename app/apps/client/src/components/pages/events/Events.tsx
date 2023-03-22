import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOutside from '../../../hooks/useOutside';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { isLoggedIn } from '../../../redux/slices/auth/auth.slice';
import { fetchProducts, getProducts } from '../../../redux/slices/products/products.slice';
import Modal from '../../ui/modal-pay/Modal';

import styles from './Events.module.scss';
import close from '../../../assets/close.svg';
import edit from '../../../assets/edit.svg';

const Events: FC = () => {
   const products = useAppSelector(getProducts);
   const dispatch = useAppDispatch();

   const { ref, isShow, setIsShow } = useOutside(false);

   const isUser = useAppSelector(isLoggedIn);

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
               {isUser ? <Link to="/events/add">+</Link> : null}
               {products.length !== 0 ? (
                  products.map((item, index) => (
                     <div key={index}>
                        <div>
                           <Link to={`/events/change/${item._id}`}>
                              <img src={edit} />
                           </Link>
                           <button type="button">
                              <img src={close} />
                           </button>
                        </div>
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

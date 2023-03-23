import { FC, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOutside from '../../../hooks/useOutside';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { isLoggedIn } from '../../../redux/slices/auth/auth.slice';
import { fetchProducts, filterProducts, getProducts } from '../../../redux/slices/products/products.slice';
import Modal from '../../ui/modal-pay/Modal';
import AppContext from '../../../hooks/Context';
import { deleteOneProduct, deleteStatus, updateDeleteStatus } from '../../../redux/slices/products/deleteProduct.slice';

import styles from './Events.module.scss';
import close from '../../../assets/close.svg';
import edit from '../../../assets/edit.svg';

const Events: FC = () => {
   const products = useAppSelector(getProducts);
   const dispatch = useAppDispatch();

   const { ref, isShow, setIsShow } = useOutside(false);

   const isUser = useAppSelector(isLoggedIn);
   const statusDelete = useAppSelector(deleteStatus);
   const { token } = useContext(AppContext);

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'События';
      dispatch(fetchProducts());
   }, []);

   const onDelete = (_id: string) => {
      if (confirm('Вы уверены, что хотите удалить событие?')) {
         dispatch(deleteOneProduct({ id: _id, token }));
         dispatch(filterProducts(_id));
      }
   };

   useEffect(() => {
      if (statusDelete === 'success') {
         alert(`Событие успешно удалено`);
         dispatch(updateDeleteStatus('loading'));
      } else if (statusDelete === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateDeleteStatus('loading'));
      }
   }, [statusDelete]);

   return (
      <>
         <div className={styles.container}>
            <h1>События</h1>
            <section>
               {isUser ? <Link to="/events/add">+</Link> : null}
               {products.length !== 0 ? (
                  products.map((item, index) => (
                     <div key={index}>
  {isUser ?                       <div>
                           <Link to={`/events/change/${item._id}`}>
                              <img src={edit} />
                           </Link>
                           <button type="button" onClick={() => onDelete(item._id)}>
                              <img src={close} />
                           </button>
                        </div> : null}
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <span>
                           Дата проведения: {item.date}
                           <br />
                           Время: {item.time}
                        </span>
                        <h3>
                           Посещение - <span>{item.free === 'Бесплатное' ? 'Бесплатное' : 'Платное'}</span>
                        </h3>
                        {item.free === 'Бесплатное' ? null : (
                           <span ref={ref}>
                              <button type="button" onClick={() => setIsShow(!isShow)}>
                                 Купить билеты
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

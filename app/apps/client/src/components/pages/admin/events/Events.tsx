import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useOutside from '../../../../hooks/useOutside';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { isLoggedIn } from '../../../../redux/slices/auth/auth.slice';
import { fetchProducts, getProducts } from '../../../../redux/slices/products/products.slice';
import Modal from '../../../ui/modal-pay/Modal';

import styles from './Events.module.scss';

const AddEvents: FC = () => {
   const products = useAppSelector(getProducts);
   const dispatch = useAppDispatch();

   const { ref, isShow, setIsShow } = useOutside(false);

   const isUser = useAppSelector(isLoggedIn);

   const navigate = useNavigate();

   useEffect(() => {
      if (!isUser) {
         alert('You are not authenticated');
         return navigate('/');
      }
      window.scrollTo(0, 0);
      document.title = 'События';
      dispatch(fetchProducts());
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>Добавить событие</h1>
            <form>
               <span>
                  <label htmlFor="name">Название события</label>
                  <input type="text" id="name" name="name" />
               </span>
               <span>
                  <label htmlFor="description">Описание события</label>
                  <textarea id="description" name="description" />
               </span>
               <span>
                  <label htmlFor="date">Дата</label>
                  <input type="date" id="date" name="date" />
               </span>
               <span>
                  <label htmlFor="time">Время</label>
                  <input type="time" id="time" name="time" />
               </span>
               <span>
                  <label htmlFor="time">Время</label>
                  <input type="time" id="time" name="time" />
               </span>
               <span>
                  <label htmlFor="time">freeeeeeeeeeeeeeee</label>
                  <input type="time" id="time" name="time" />
               </span>
               <span>
                  <label htmlFor="price">price</label>
                  <input type="text" id="price" name="price" />
               </span>
               <span>
                  <label htmlFor="tickets">tickets</label>
                  <input type="text" id="tickets" name="tickets" />
               </span>
            </form>
         </div>
      </>
   );
};

export default AddEvents;

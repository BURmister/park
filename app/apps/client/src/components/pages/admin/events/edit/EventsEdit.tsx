import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AppContext from '../../../../../hooks/Context';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { editOneProduct, editProductStatus, updateEditStatus } from '../../../../../redux/slices/products/editProduct.slice';
import { fetchOneProduct, getOneProduct } from '../../../../../redux/slices/products/oneProduct.slice';

import styles from './EventsEdit.module.scss';

const EventsEdit: FC = () => {
   const dispatch = useAppDispatch();

   const product = useAppSelector(getOneProduct);
   const status = useAppSelector(editProductStatus);

   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [date, setDate] = useState<string>('');
   const [time, setTime] = useState<string>('');
   const [free, setFree] = useState<string>('');
   const [price, setPrice] = useState<string>('');
   const [tickets, setTickets] = useState<string>('');

   const { token } = useContext(AppContext);

   const params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'События';
      params.id && dispatch(fetchOneProduct(params.id));
   }, []);

   useEffect(() => {
      if (product) {
         setName(product.name);
         setDescription(product.description);
         setDate(product.date);
         setTime(product.time);
         setFree(product.free)
         setPrice(product.price);
         setTickets(String(product.tickets));
      }
   }, [product]);

   const acceptChanges = () => {
      if (name !== '' && description !== '' && date !== '' && date !== '' && time !== '' && price !== '' && tickets !== '' && params.id) {
         const ticketsAmount = Number(tickets)
         const forFree = free === 'Бесплатное' ? free : 'Платное'
         dispatch(editOneProduct({ id: params.id, object: { name, description, date, time, free: forFree, price, tickets: ticketsAmount }, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Событие изменено \nКод: ${params.id}`);
         dispatch(updateEditStatus('loading'));
         navigate('/events');
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateEditStatus('loading'));
         navigate('/events');
      }
   }, [status]);

   return (
      <>
         <div className={styles.container}>
            <h1>Изменить событие</h1>
            <form>
               <span>
                  <label htmlFor="name">Название события</label>
                  <input value={name} onChange={(event) => setName(event.target.value)} type="text" id="name" name="name" />
               </span>
               <span>
                  <label htmlFor="description">Описание события</label>
                  <textarea value={description} onChange={(event) => setDescription(event.target.value)} id="description" name="description" />
               </span>
               <span>
                  <label htmlFor="date">Дата</label>
                  <input value={date} onChange={(event) => setDate(event.target.value)} type="text" id="date" name="date" />
               </span>
               <span>
                  <label htmlFor="time">Время</label>
                  <input value={time} onChange={(event) => setTime(event.target.value)} type="time" id="time" name="time" />
               </span>
               <span>
                  <label htmlFor="free">Посещение</label>
                  <select
                     name="free"
                     id="free"
                     value={free}
                     onChange={(event) => setFree(event.target.value)}
                     placeholder="Тип "
                     required>
                     <option value="Бесплатное">Бесплатное</option>
                     <option value="Платное">Платное</option>
                  </select>
               </span>
               <span>
                  <label htmlFor="price">Цена</label>
                  <input value={price} onChange={(event) => setPrice(event.target.value)} min="0" type="number" id="price" name="price" />
               </span>
               <span>
                  <label htmlFor="tickets">Количество билетов</label>
                  <input value={tickets} onChange={(event) => setTickets(event.target.value)} min="0" type="number" id="tickets" name="tickets" />
               </span>
               <button type="button" onClick={() => acceptChanges()}>
                  Принять изменения
               </button>
            </form>
         </div>
      </>
   );
};

export default EventsEdit;

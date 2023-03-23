import { FC, useContext, useEffect, useState } from 'react';
import AppContext from '../../../../../hooks/Context';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { addedProduct, addedStatus, addProduct, updateAddStatus } from '../../../../../redux/slices/products/addProduct.slice';

import styles from './EventsAdd.module.scss';

const AddEvents: FC = () => {
   const dispatch = useAppDispatch();
   const added = useAppSelector(addedProduct);
   const status = useAppSelector(addedStatus);
   const { token } = useContext(AppContext);

   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [date, setDate] = useState<string>('');
   const [time, setTime] = useState<string>('');
   const [free, setFree] = useState<string>('Бесплатное');
   const [price, setPrice] = useState<string>('0');
   const [tickets, setTickets] = useState<string>('0');

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'События';
   }, []);

   const onSubmit = async () => {
      if (name !== '' && description !== '' && date !== '' && date !== '' && time !== '' && price !== '' && tickets !== '') {
         const ticketsAmount = Number(tickets);
         const forFree = free === 'Бесплатное' ? free : 'Платное';
         const localeDate = date.slice(8) + date.slice(4, 8) + date.slice(0, 4);
         dispatch(
            addProduct({
               object: { name, description, date: localeDate.replaceAll('-', '.'), time, free: forFree, price, tickets: ticketsAmount },
               token,
            }),
         );
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Событие добавлено \nКод: ${added}`);
         dispatch(updateAddStatus('loading'));
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateAddStatus('loading'));
      }
   }, [status]);

   return (
      <>
         <div className={styles.container}>
            <h1>Добавить событие</h1>
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
                  <input value={date} onChange={(event) => setDate(event.target.value)} type="date" id="date" name="date" />
               </span>
               <span>
                  <label htmlFor="time">Время</label>
                  <input value={time} onChange={(event) => setTime(event.target.value)} type="time" id="time" name="time" />
               </span>
               <span>
                  <label htmlFor="free">Посещение</label>
                  <select name="free" id="free" value={free} onChange={(event) => setFree(event.target.value)} placeholder="Тип " required>
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
               <button type="button" onClick={() => onSubmit()}>
                  Добавить
               </button>
            </form>
         </div>
      </>
   );
};

export default AddEvents;

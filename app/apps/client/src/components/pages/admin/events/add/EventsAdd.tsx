import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';

import styles from './EventsAdd.module.scss';

const AddEvents: FC = () => {
   const dispatch = useAppDispatch();

   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [date, setDate] = useState<string>('');
   const [time, setTime] = useState<string>('');
   const [free, setFree] = useState<string>('');
   const [price, setPrice] = useState<string>('');
   const [tickets, setTickets] = useState<string>('');

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'События';
   }, []);

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
                  <select
                     name="free"
                     id="free"
                     defaultValue={'Бесплатное'}
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
                  <input value={price} onChange={(event) => setPrice(event.target.value)} type="number" id="price" name="price" />
               </span>
               <span>
                  <label htmlFor="tickets">Количество билетов</label>
                  <input value={tickets} onChange={(event) => setTickets(event.target.value)} type="number" id="tickets" name="tickets" />
               </span>
               <button type="button">Добавить</button>
            </form>
         </div>
      </>
   );
};

export default AddEvents;

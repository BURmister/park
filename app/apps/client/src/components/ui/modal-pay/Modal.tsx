import { FC, useState, useEffect, useRef } from 'react';

import styles from './Modal.module.scss';
import close from '../../../assets/close.svg';

type props = {
   name: string;
   date: string | false;
   time: string | false;
   price: string;

   open: boolean;
   onClickOpen: () => void;
   ref: any;
};

const Modal: FC<props> = ({ ref, open, onClickOpen, name, date, time, price }) => {
   const [buyerName, setBuyerName] = useState<string>('');
   const [buyerTel, setBuyerTel] = useState<string>('');
   const [buyerEmail, setBuyerEmail] = useState<string>('');
   const [selectedTime, setSelectedTime] = useState<string>('');
   const [counter, setCounter] = useState<number>(1);
   const [selectedDate, setSelectedDate] = useState<string>('');

   const globalDate = new Date().toISOString().split('T')[0];
   let today = globalDate;
   const moscowTime = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });

   if (moscowTime > '12:00:00') {
      //disable 12 option
   } else if (moscowTime > '17:00:00') {
      //disable 17 option
      const lastChar = Number(globalDate[globalDate.length - 1]);
      today = globalDate.slice(0, today.length - 1) + String(lastChar + 1);
   } else {
      today = globalDate;
   }
   // else {
   //    we need get MoscowDate, not GlobalDate, {timezone: Msc} and convert to ISO-String
   //    How? I don't know
   // }

   useEffect(() => {
      date !== false && setSelectedDate(date);
      time !== false && setSelectedTime(time);
   }, [open]);

   console.log(today);

   return (
      <div className={`${styles.overlay} ${styles.animated} ${open ? styles.show : styles.close}`}>
         <div className={styles.modal}>
            <h3>{name}</h3>
            <button onClick={onClickOpen} className={styles.closeIcon}>
               <img src={close} alt="icon like X to close modal window" />
            </button>
            <form>
               <span>
                  <label htmlFor="name">Введите ФИО, на которое оформляем билеты</label>
                  <input type="text" name="name" id="name" value={buyerName} onChange={(event) => setBuyerName(event.target.value)} />
               </span>
               <span>
                  <label htmlFor="tel">Введите телефон для связи</label>
                  <input type="tel" name="tel" id="tel" value={buyerTel} onChange={(event) => setBuyerTel(event.target.value)} />
               </span>
               <span>
                  <label htmlFor="email">
                     Введите почту.
                     <br /> Мы отправим на нее электронную копию билетов
                  </label>
                  <input type="email" name="email" id="email" value={buyerEmail} onChange={(event) => setBuyerEmail(event.target.value)} />
               </span>
               <span>
                  {date === false ? (
                     <>
                        <label htmlFor="date">Выберите дату</label>
                        <input type="date" name="date" onChange={(event) => setSelectedDate(event.target.value)} min={today} id="date" />
                     </>
                  ) : (
                     <h4>
                        Дата: <span>{date}</span>
                     </h4>
                  )}
               </span>
               <span>
                  {time === false ? (
                     <>
                        <label htmlFor="time">Выберите время</label>
                        <select
                           name="time"
                           id="time"
                           value={selectedTime}
                           onChange={(event) => setSelectedTime(event.target.value)}
                           placeholder="Выберите время"
                           required>
                           <option disabled={selectedDate === today ? (moscowTime > '12:00:00' ? true : false) : false} value="12:00 первый_сеанс">
                              12:00
                           </option>
                           <option disabled={selectedDate === today ? (moscowTime > '17:00:00' ? true : false) : false} value="17:00 второй_сеанс">
                              17:00
                           </option>
                        </select>
                     </>
                  ) : (
                     <h4>
                        Время: <span>{time}</span>
                     </h4>
                  )}
               </span>
               <span className={styles.counter}>
                  <label htmlFor="counter">Введите количество билетов</label>
                  <div>
                     <button type="button" disabled={counter > 1 ? false : true} onClick={() => setCounter(counter - 1)}>
                        -
                     </button>
                     <p id="counter">{counter}</p>
                     <button type="button" disabled={counter < 100 ? false : true} onClick={() => setCounter(counter + 1)}>
                        +
                     </button>
                  </div>
               </span>
               <h4>
                  Цена: <span>{Number(price) * counter}</span>₽
               </h4>
               <button>Оформить</button>
            </form>
         </div>
      </div>
   );
};

export default Modal;

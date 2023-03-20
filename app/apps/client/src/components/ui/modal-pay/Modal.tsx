import { FC, useState, useEffect } from 'react';

import styles from './Modal.module.scss';
import close from '../../../assets/close.svg'

type props = {
   name: string;
   open: boolean;
   onClickOpen: () => void;
   ref: any;
};

const Modal: FC<props> = ({ ref, open, onClickOpen, name }) => {
   const [counter, setCounter] = useState<number>(1);
   const price = 100500

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
                  <input type="text" name="name" id="name" />
               </span>
               <span>
                  <label htmlFor="tel">Введите телефон для связи</label>
                  <input type="tel" name="tel" id="tel" />
               </span>
               <span>
                  <label htmlFor="email">
                     Введите почту.
                     <br /> Мы отправим на нее электронную копию билетов
                  </label>
                  <input type="email" name="email" id="email" />
               </span>
               <span>
                  <label htmlFor="date">Выберите дату</label>
                  <input type="date" name="date" id="date" />
               </span>
               <span>
                  <label htmlFor="time">Выберите время</label>
                  <select name="time" id="time" required>
                     <option value="первый сеанс" selected>
                        12:00
                     </option>
                     <option value="второй сеанс">17:00</option>
                  </select>
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
                  Цена: <span>{price}</span>₽
               </h4>
               <button>Оформить</button>
            </form>
         </div>
      </div>
   );
};

export default Modal;

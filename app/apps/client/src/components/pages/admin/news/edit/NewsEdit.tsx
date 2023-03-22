import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';

import styles from './NewsEdit.module.scss';

const NewsEdit: FC = () => {
   const dispatch = useAppDispatch();

   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [date, setDate] = useState<string>('');

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Новости';
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>Изменить новость</h1>
            <form>
               <span>
                  <label htmlFor="name">Название новости</label>
                  <input value={name} onChange={(event) => setName(event.target.value)} type="text" id="name" name="name" />
               </span>
               <span>
                  <label htmlFor="description">Описание новости</label>
                  <textarea value={description} onChange={(event) => setDescription(event.target.value)} id="description" name="description" />
               </span>
               <span>
                  <label htmlFor="date">Дата</label>
                  <input value={date} onChange={(event) => setDate(event.target.value)} type="date" id="date" name="date" />
               </span>
               <button type="button">Принять изменения</button>
            </form>
         </div>
      </>
   );
};

export default NewsEdit;

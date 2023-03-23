import { FC, useContext, useEffect, useState } from 'react';
import AppContext from '../../../../../hooks/Context';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { addedNews, addedNewsStatus, addNews, updateAddStatus } from '../../../../../redux/slices/news/addNews';

import styles from './NewsAdd.module.scss';

const AddNews: FC = () => {
   const dispatch = useAppDispatch();
   const added = useAppSelector(addedNews);
   const status = useAppSelector(addedNewsStatus);

   const { token } = useContext(AppContext);

   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [date, setDate] = useState<string>('');

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Новости';
   }, []);

   const onSubmit = () => {
      if (name !== '' && description !== '' && date !== '') {
         const localeDate = date.slice(8) + date.slice(4, 8) + date.slice(0, 4)
         dispatch(addNews({ object: { name, description, date: localeDate.replaceAll('-', '.') }, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Новость добавлена \nКод: ${added}`);
         dispatch(updateAddStatus('loading'));
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateAddStatus('loading'));
      }
   }, [status]);

   return (
      <>
         <div className={styles.container}>
            <h1>Добавить новость</h1>
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
               <button type="button" onClick={() => onSubmit()}>
                  Добавить
               </button>
            </form>
         </div>
      </>
   );
};

export default AddNews;

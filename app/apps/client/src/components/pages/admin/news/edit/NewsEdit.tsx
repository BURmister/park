import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../../../../hooks/Context';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { editNewsStatus, editOneNews, updateEditStatus } from '../../../../../redux/slices/news/editNews';
import { fetchOneNews, getOneNews } from '../../../../../redux/slices/news/oneNews';

import styles from './NewsEdit.module.scss';

const NewsEdit: FC = () => {
   const dispatch = useAppDispatch();
   const news = useAppSelector(getOneNews);
   const status = useAppSelector(editNewsStatus)

   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [date, setDate] = useState<string>('');

   const { token } = useContext(AppContext);

   const params = useParams();
   const navigate = useNavigate()

   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Новости';
      params.id && dispatch(fetchOneNews(params.id));
   }, []);

   useEffect(() => {
      if (news) {
         setName(news.name);
         setDescription(news.description);
         setDate(news.date);
      }
   }, [news]);

   const acceptChanges = () => {
      if (name !== '' && description !== '' && date !== '' && params.id) {
         dispatch(editOneNews({ id: params.id, object: { name, description, date }, token }));
      } else {
         alert('Все поля должны быть заполнены');
      }
   };

   useEffect(() => {
      if (status === 'success') {
         alert(`Новость изменена \nКод: ${params.id}`);
         dispatch(updateEditStatus('loading'));
         navigate('/news');
      } else if (status === 'error') {
         alert('Что-то пошло не так. Попробуйте позже');
         dispatch(updateEditStatus('loading'));
         navigate('/news');
      }
   }, [status]);

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
                  <input value={date} onChange={(event) => setDate(event.target.value)} type="text" id="date" name="date" />
               </span>
               <button type="button" onClick={() => acceptChanges()}>Принять изменения</button>
            </form>
         </div>
      </>
   );
};

export default NewsEdit;

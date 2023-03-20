import { FC, useEffect } from 'react';

import styles from './News.module.scss';

const news = [
   {
      id: '1',
      name: 'Название новости. Может быть длинным. А может и не быть!',
      date: '23.04.2004',
      description:
         'Это какое-то описание новости. Побольше текста. Ведь новость одним заголовком не расскроешь. А если статья? То вообще заголовка не хватит. Ну вообщем, например новость: в парке раскрыли свои бутоны редкие цветы, позеленела трава, поселились новые птицы. Скорее прихожите, чтобы увидеть эту красоту первыми!',
   },
   {
      id: '2',
      name: 'Название новости. Может быть длинным. А может и не быть!',
      date: '23.04.2004',
      description:
         'Это какое-то описание новости. Побольше текста. Ведь новость одним заголовком не расскроешь. А если статья? То вообще заголовка не хватит. Ну вообщем, например новость: в парке раскрыли свои бутоны редкие цветы, позеленела трава, поселились новые птицы. Скорее прихожите, чтобы увидеть эту красоту первыми!',
   },
   {
      id: '3',
      name: 'Название новости. Может быть длинным. А может и не быть!',
      date: '23.04.2004',
      description:
         'Это какое-то описание новости. Побольше текста. Ведь новость одним заголовком не расскроешь. А если статья? То вообще заголовка не хватит. Ну вообщем, например новость: в парке раскрыли свои бутоны редкие цветы, позеленела трава, поселились новые птицы. Скорее прихожите, чтобы увидеть эту красоту первыми!',
   },
];

const News: FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'Новости';
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>Новости</h1>
            <section>
               {news.length !== 0 ? (
                  news.map((item, index) => (
                     <div key={index}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <span>{item.date}</span>
                     </div>
                  ))
               ) : (
                  <div>
                     <h2>
                        Пока новостей нет.
                        <br /> Как появятся - сразу расскажем!
                     </h2>
                  </div>
               )}
            </section>
         </div>
      </>
   );
};

export default News;

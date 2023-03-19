import { FC, useEffect } from 'react';

import styles from './About.module.scss';

const About: FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'О Парке';
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>О Парке</h1>
            <section>
               <h2>Территория парка открыта круглосуточно</h2>
            </section>
            <section>
               <div>
                  <img src="https://www.zaryadyepark.ru/upload/medialibrary/5af/5afdb4db4bc98c5eff2eda5e2ba61156.JPG" />
                  <img src="https://www.zaryadyepark.ru/upload/medialibrary/c73/c7302ec5fa025e22639fdffd4f25d57d.JPG" />
               </div>
               <p className={styles.text__first}>
                  «Парк» — современное место для отдыха, развлечений и получения знаний, созданный международной командой архитекторов, инженеров,
                  ландшафтных дизайнеров и других экспертов. Здесь природа и технологии, просвещение и развлечения, история и современность
                  соединяются и дополняют друг друга.
               </p>
            </section>
            <section>
               <p className={styles.text__second}>
                  Сегодня «Парк» — городская достопримечательность, притягивающая туристов со всего мира, символ современного города – комфортного и
                  безопасного мегаполиса мирового значения. На территории парка объекты культурного наследия XVI века соседствуют с инновационной
                  архитектурой и высокотехнологичными аттракционами. С Парящего моста — бетонной консоли длиной 70 метров — открываются потрясающие
                  панорамные виды на другие достопримечательности, центр города, набережные и сам парк. Под Стеклянной корой – конструкцией без
                  внешних стен – круглый год поддерживается комфортная температура для теплолюбивых растений. Во Флорариуме собрана коллекция
                  российских и редких экзотических растений.
               </p>
               <div>
                  <img src="https://www.zaryadyepark.ru/upload/medialibrary/b57/b575e8c1529e4963516e216510f5e613.jpg" />
                  <img src="https://www.zaryadyepark.ru/upload/medialibrary/ddd/ddd80efe7e7f6d6a83163c6f4823de99.JPG" />
               </div>
            </section>
            <iframe
               className={styles.map}
               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1419.4488857446377!2d38.97788512526945!3d55.80034744160555!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414b1c8788245941%3A0xbf6bf4ac8124c0dd!2z0J_RgNC-0LzRi9GI0LvQtdC90L3Qvi3RjdC60L7QvdC-0LzQuNGH0LXRgdC60LjQuSDQutC-0LvQu9C10LTQtiDQk9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdC-0LPQviDQvtCx0YDQsNC30L7QstCw0YLQtdC70YzQvdC-0LPQviDRg9GH0YDQtdC20LTQtdC90LjRjyDQstGL0YHRiNC10LPQviDQvtCx0YDQsNC30L7QstCw0L3QuNGPINCc0L7RgdC60L7QstGB0LrQvtC5INC-0LHQu9Cw0YHRgtC4IMKr0JPQvtGB0YPQtNCw0YDRgdGC0LLQtdC90L3QvtCz0L4g0LPRg9C80LDQvdC40YLQsNGA0L3Qvi3RgtC10YXQvdC-0LvQvtCz0LjRh9C10YHQutC-0LPQviDRg9C90LjQstC10YDRgdC40YLQtdGCwrs!5e0!3m2!1sru!2sru!4v1674292653451!5m2!1sru!2sru"
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"></iframe>
         </div>
      </>
   );
};

export default About;

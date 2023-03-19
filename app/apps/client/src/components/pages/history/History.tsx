import { FC, useEffect } from 'react';

import styles from './History.module.scss';

const History: FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = 'История Парка';
   }, []);

   return (
      <>
         <div className={styles.container}>
            <h1>История Парка</h1>
            <section>
               <p>
                  «Парк» — современный парк для отдыха, развлечений и получения знаний, созданный международной командой архитекторов, инженеров,
                  ландшафтных дизайнеров и других экспертов. Здесь природа и технологии, просвещение и развлечения, история и современность
                  соединяются и дополняют друг друга.
               </p>
            </section>
            <section>
               <p>
                  За свою многовековую историю древнейший район Парка не раз кардинально менял свой облик: тут проходила первая улица посада, сменяли
                  друг друга Английское посольство, царская резиденция, еврейский квартал и даже трущобы. В начале ХХ века в Парке начали строить
                  самую большую российскую высотку, но проект заморозили.
               </p>
               <img src="https://www.zaryadyepark.ru/local/templates/zaryadye_new/assets/images/page-about__2.jpg" />
            </section>
            <section>
               <img src="https://www.mywaymag.ru/wp-content/uploads/2018/06/Zaryadye-Park-Diller-Scofidio-Renfro-Iwan-Baan-01-min.jpg" />
               <p>
                  После разрушения гостиницы это место долгое время представляло собой унылый пустырь, огороженный строительным забором.Строительство
                  Парка началось в 2014 году. Ландшафтно-архитектурной концепцией парка занимались архитекторы бюро Diller Scofidio + Renfro
                  (Нью-Йорк), специалисты ландшафтной мастерской Hargreaves Associates (Нью-Йорк) и урбанисты из Citymakers (Москва).
               </p>
            </section>
         </div>
      </>
   );
};

export default History;
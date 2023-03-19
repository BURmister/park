import { FC, useState, useEffect } from 'react'

import styles from './Footer.module.scss'

const Footer: FC = () => {
   return (
      <footer>
         <div className={styles.wrapper}>
            <ul>
               <li>
                  <a href="/" target="_blank">
                     Карта Парка
                  </a>
               </li>
               <li>
                  <a href="/" target="_blank">
                     Правила
                  </a>
               </li>
               <li>
                  <a href="/" target="_blank">
                     Вопросы
                  </a>
               </li>
               <li>
                  <a href="/" target="_blank">
                     Поддeржка
                  </a>
               </li>
            </ul>
            <div>
               <span>2023 / Все права защищены</span>
               <ul>
                  <li>
                     <a href="/" target="_blank">
                        Вопросы и ответы
                     </a>
                  </li>
                  <li>
                     <a href="/" target="_blank">
                        Бронирование для групп
                     </a>
                  </li>
                  <li>
                     <a href="/" target="_blank">
                        Контакты
                     </a>
                  </li>
                  <li>
                     <a href="/" target="_blank">
                        Для СМИ
                     </a>
                  </li>
                  <li>
                     <a href="/" target="_blank">
                        Организаторам мероприятий
                     </a>
                  </li>
                  <li>
                     <a href="/" target="_blank">
                        Как добраться
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   );
}

export default Footer
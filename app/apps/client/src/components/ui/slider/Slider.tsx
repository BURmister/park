import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';

import './Slider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Slider.module.scss';
import card2 from './card2.png';

type props = {
   img: string;
};

const Slider: FC<props> = ({ img }) => {
   return (
      <Swiper
         modules={[Navigation, Autoplay, Pagination]}
         spaceBetween={0}
         slidesPerView={1}
         onSlideChange={() => console.log('slide change')}
         onSwiper={(swiper) => console.log(swiper)}
         className={styles.wrapper}
         autoplay={{
            delay: 5000,
            pauseOnMouseEnter: true,
         }}
         pagination={{ clickable: true }}
         navigation>
         <SwiperSlide className={styles.slide}>
            <img src="http://sinaifox.ru/wp-content/uploads/2019/04/Зарядье.jpg" />
         </SwiperSlide>
         <SwiperSlide className={styles.slide}>
            <img src="https://all.accor.com/magazine/imagerie/1-b224.jpg" />
         </SwiperSlide>
         <SwiperSlide className={styles.slide}>
            <img src="https://all.accor.com/magazine/imagerie/2-daf3.jpg" />
         </SwiperSlide>
         <SwiperSlide className={styles.slide}>
            <img src="https://all.accor.com/magazine/imagerie/5-7c6b.jpg" />
         </SwiperSlide>
         <SwiperSlide className={styles.slide}>
            <img src="https://all.accor.com/magazine/imagerie/6-c3b8.jpg" />
         </SwiperSlide>
         <SwiperSlide className={styles.slide}>
            <img src="https://all.accor.com/magazine/imagerie/9-da87.jpg" />
         </SwiperSlide>
         <SwiperSlide className={styles.slide}>
            <img src="https://all.accor.com/magazine/imagerie/10-82da.jpg" />
         </SwiperSlide>
      </Swiper>
   );
};

export default Slider;

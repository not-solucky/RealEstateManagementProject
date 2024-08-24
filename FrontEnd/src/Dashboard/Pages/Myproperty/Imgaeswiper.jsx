import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ImageApi } from "../../../api/image";

import './imageswiper.scss';
function ImageSwiper({ images }) {
    return (
        <>
            <section className="imageswiper-section">
                <div className="property-container">
                    <div className="swiper-content">
                        <Swiper
                            className='swiper-container'
                            spaceBetween={20}
                            slidesPerView={1}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                            pagination={{ clickable: true, el: '.swiper-pagination' }}
                            breakpoints={{
                                769: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1025: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                            }}
                            modules={[Navigation, Pagination, Autoplay]}
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="swiper-image-container">
                                        <img src={ImageApi.GetStaticPropertyImage(img)} alt={`Slide ${index + 1}`} />
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-container">
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-pagination"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ImageSwiper;
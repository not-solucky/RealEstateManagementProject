import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners'; // Assuming you have HashLoader from react-spinners
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './properties.css';



function Propertiespage() {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        setTimeout(() => { // Simulating a fetch call
            setDetails({
                id: 1,
                title: "Seaside Serenity Villa",
                price: 550000,
                image: ["/property02.jpg", "/property01.jpg", "/property03.jpg", "/property01.jpg", "/property01.jpg", "/property01.jpg", "/property01.jpg", "/property01.jpg", "/property01.jpg"],
                description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood with a view of the ocean. Perfect for a family looking for a quiet retreat."
            });
        }, 2000); // Simulate a network request delay
    }, []);

    return (
        <>
            <section className="properties-section">
                <div className="container">
                    
                        {details ? (
                            <>
                                <div className="title-content">
                                    <h1 className="property-name">
                                        {details.title}
                                    </h1>
                                    <div className="property-price">
                                        <p>price</p>
                                        <h2>${details.price}</h2>
                                    </div>
                                </div>
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
                                        pagination={{ clickable: true, el: '.swiper-pagination'}}
                                        breakpoints={{
                                            
                                            1025: {
                                                slidesPerView: 2,
                                                spaceBetween: 30,
                                            },
                                        }}
                                        modules={[Navigation, Pagination,Autoplay]}
                                        
                                    >
                                        {details.image.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="swiper-image-container">
                                                    <img src={img} alt={`Slide ${index + 1}`} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                        <div className="swiper-button-container">
                                            <div className="swiper-button-prev"></div>
                                            <div className="swiper-pagination">-</div>
                                            <div className="swiper-button-next"></div>
                                        </div>
                                    </Swiper>
                                </div>
                            </>
                        ) : (
                            <div className="title-content">
                                <HashLoader color="#703bf7" />
                            </div>
                        )}
                    
                </div>
            </section>
        </>
    );
}

export default Propertiespage;




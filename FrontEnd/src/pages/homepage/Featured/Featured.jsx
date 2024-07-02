import './stylesheets/featuredsection.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
function Card({card}){
    return(
        <>
            <div className="card-image">
                <img src={card.image} alt="Property Image"></img>
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{card.title}</h3>
                    <p>{card.description}... <span className="description-expand">Read More</span></p>
                </div>
                <div className="card-footer">
                    <div className="price-box">
                        <p>Price</p>
                        <h2>৳ {card.price}</h2>

                    </div>
                    <button>Property Details</button>
                </div>
            </div>

        
        </>
    )
}

function CardSwiper({cards}) {
    return (
        <>
            <div className="card-container">
                <Swiper
                    className='swiper-container'
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                    breakpoints={{
                        601: {
                            slidesPerView: 2,
                        },
                        1025: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[Navigation, Autoplay]}
                >
                    {cards.map((card, index) => (
                        <SwiperSlide key={index} className = "card">
                            <Card card={card}/>
                        </SwiperSlide>
                    ))}
                    <div className="line"></div>
                    <div className="swiper-footer">
                        <div className="number">
                            <p>{"10"} <span>of {"60"}</span></p>
                        </div>
                        <button className="button-1">View All Properties</button>
                        <div className="swiper-button-container">
                            <div className="swiper-button-prev"></div>
                            <div className="number hidden">
                                <p>{"10"} <span>of {"60"}</span></p>
                            </div>
                            <div className="swiper-button-next"></div>
                        </div>
                    </div>
                </Swiper>
            </div>
        </>
    );
}




function Featured() {

    const allcards = [
        {
            'title': 'Property 1',
            'price': '100,000',
            'description': 'This is a description of property 1',
            'image': '/property01.jpg'
        },
        {
            'title': 'Property 2',
            'price': '200,000',
            'description': 'This is a description of property 2',
            'image': '/property02.jpg'
        },
        {
            'title': 'Property 3',
            'price': '300,000',
            'description': 'This is a description of property 3',
            'image': '/property03.jpg'
        },
        {
            'title': 'Property 4',
            'price': '400,000',
            'description': 'This is a description of property 4',
            'image': '/property01.jpg'
        },
        {
            'title': 'Property 5',
            'price': '500,000',
            'description': 'This is a description of property 5',
            'image': '/property02.jpg'
        },
        {
            'title': 'Property 6',
            'price': '600,000',
            'description': 'This is a description of property 6',
            'image': '/property03.jpg'
        },
    ]
    return (
        <>
            <section className="featured-section">
                <div className="container">
                    <div className="title-container">
                        <div className="title">
                            <h2>Featured Properties</h2>
                            <p>Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Nest Navigator. Click "View Details" for more information.</p>
                        </div>

                        <button className="button-1">View All Properties</button>

                    </div>
                    <CardSwiper cards = {allcards}/>
                </div>
            </section>
            
        </>
    );
}

export default Featured;
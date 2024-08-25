import { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners'; // Assuming you have HashLoader from react-spinners
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './stylesheets/properties.css';
import './stylesheets/propertiestitle.css';
import './stylesheets/propertiesinfo.css';


function TitleSection({ title, price }) {
    return (
        <div className="property-title-section">
            <div className="container">
                <div className="title-content">
                    <h1 className="property-name">
                        {title}
                    </h1>
                    <div className="property-info">
                        <div className="property-location">
                            <div className="location-icon"></div>
                            <p>San Francisco, CA</p>
                        </div>
                        <div className="property-price">
                            <p>For sale</p>
                            <h2>${price}</h2>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

function PropertyInfo({description, amenities, feature}){
    return(
        <div className="description-section">
            <div className="container">
                <div className="description-content">
                    <div className="text-content">
                        <h2>Description</h2>
                        <p>{description}</p>
                    </div>  
                    
                    
                </div>
                <div className="amenities-content">
                    <h2>Key Features and Amenities</h2>
                    <div className="amenities-list">
                        
                        {amenities.map((amenity, index) => (
                            <div className="amenity-item" key={index}>{amenity}</div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

function Propertiespage() {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        setTimeout(() => { // Simulating a fetch call
            setDetails({
                id: 1,
                title: "Seaside Serenity Villa",
                price: 550000,
                image: ["/property02.jpg", "/property01.jpg", "/property03.jpg", "/property01.jpg", "/property01.jpg", "/property01.jpg", "/property01.jpg", "/property01.jpg", "/property01.jpg"],
                description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood with a view of the ocean. Perfect for a family looking for a quiet retreat.",
                amenities: [
                    "Expansive oceanfront terrace for outdoor entertaining",
                    "Gourmet kitchen with top-of-the-line appliances",
                    "Spacious living room with fireplace",
                    "Private beach access for morning strolls and sunset views",
                    "Master suite with a spa-inspired bathroom and ocean-facing balcony",
                    "Private garage and ample storage space"
                ],
                feature:{
                    room: 4,
                    bathroom: 3,
                    size: 3000
                }
            });
        }, 2000); // Simulate a network request delay
    }, []);

    return (
        <>
            {details ? (
                <>
                    <TitleSection title={details.title} price={details.price} />
                    <ImageSwiper images={details.image} />
                    <PropertyInfo description={details.description} amenities={details.amenities} feature={details.feature}/>
                </>
            ) : (
                <div className="loading-section">
                    <HashLoader color="#703bf7" size={50} />
                </div>
                
            )}
        </>
    );
}

export default Propertiespage;




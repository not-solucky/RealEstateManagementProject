import "./Myproperty.scss";
import { PropertyApi } from "../../../api/property";
import { ImageApi } from "../../../api/image";
import { useEffect, useState } from "react";
import ImageSwiper from "./Imgaeswiper";

function PropertyCard ({property, setShowProperty, setPropertyId}) {
    const handleClick = () => {
        setShowProperty(true);
        setPropertyId(property.property_id);
    }
    return (
        <div className="card">
            <div className="card-image">
                <img src={ImageApi.GetStaticPropertyImage(property.photo_urls[0])} alt={property.title} />
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{property.title}</h3>
                    <p>{property.description}</p>
                </div>
                <div className="address">
                    <p>{property.city}, {property.state}</p>
                    <p>For {property.type}</p>
                    <p>{property.category}</p>
                </div>
                
                <div className="card-footer">
                    <div className="price-box">
                        <p>Price</p>
                        <h2>{property.price}</h2>
                    </div>
                    <button onClick={handleClick} >Property Details</button>
                </div>
            </div>
        </div>
    );
}
function ActiveListings() {
    const [properties, setProperties] = useState([]);
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState("");
    const [showProperty, setShowProperty] = useState(false);
    const [porpertyId, setPropertyId] = useState(null);

    const GetProperty = async () => {
        setMessage("Loading...");
        const { statusCode, data } = await PropertyApi.DashGetActiveListings();
        if (statusCode === 200) {
            setProperties(data.property);
            console.log(data)
            setCount(data.count)
        } else {
            setMessage(data.error);
        }
    };

    useEffect(() => {
        GetProperty();
    }, []);
    return (
        <div className="myproperty-container">
            <div className="title">
                <h2>Active Property Listings</h2>
            </div>
            <div className="subcontainer">
                {count === 0 && <p>No Active Listings</p>}
                {
                    showProperty ? <PropertyView id={porpertyId} setShowProperty={setShowProperty} setPropertyId={setPropertyId} /> :
                    <CardContainer properties={properties} setShowProperty={setShowProperty} setPropertyId={setPropertyId}/>
                }
                
            </div>
        </div>
    );
}

function CardContainer({properties, setPropertyId, setShowProperty}) {
    return (
        <div className="card-container">
            {properties.map((property) => (
                <PropertyCard key={property.property_id} property={property} setPropertyId = {setPropertyId} setShowProperty = {setShowProperty}/>
            ))}
        </div>
    );
}

function PropertyView({id, setShowProperty, setPropertyId}){

    const [property, setProperty] = useState({});
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetProperty = async () => {
        setMessage("Loading...");
        setLoading(true);
        const { statusCode, data } = await PropertyApi.GetPropertyById(id);
        if (statusCode === 200) {
            setProperty(data);
            setImages(data.photo_url);
            console.log(data)

        } else {
            setMessage(data.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        GetProperty();

    }, []);
    return(
        <>
            <div className="header">
                <button onClick={() => {setShowProperty(false); setPropertyId(null)}}>Back</button>
            </div>
            <div className="content-body">
                {loading ? <p>Loading...</p> :
                    <PropertyInfo property={property} images = {images} />
                }

            </div>
        </>
    )
}
function TitleSection({ title, price }) {
    return (
        <div className="property-title-section">
            <div className="property-container">
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
function PropertyInfo({property, images}) {
    return (
        <>
            <TitleSection title={property.title} price={property.price} />
            <ImageSwiper images={images} />
        </>
    );
}




export default ActiveListings;
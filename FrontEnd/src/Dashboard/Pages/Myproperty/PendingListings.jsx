import "./Myproperty.scss";
import { PropertyApi } from "../../../api/property";
import { ImageApi } from "../../../api/image";
import { useEffect, useState } from "react";

function PropertyCard ({property}){
    console.log(property)
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
                    <button>Property Details</button>
                </div>
                <div className="status">
                    {property.document_id ? (
                        <div>
                        {property.status === 'pending' ? (
                            <p>Document under review. Please allow up to 48 hours for verification.</p>
                        ) : property.status === 'rejected' ? (
                            <p>Document previously submitted was rejected. Please review and resubmit.</p>
                        ) : (
                            <p>{property.document_id}</p>
                        )}
                        </div>
                    ) : (
                        <p>No property document has been submitted for verification.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function PendingListings() {
    const [properties, setProperties] = useState([]);
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState("");

    const GetProperty = async () => {
        setMessage("Loading...");
        const { statusCode, data } = await PropertyApi.DashGetPendingListings();
        if (statusCode === 200) {
            setProperties(data.property);
            console.log(data)
            setCount(data.count)
            if (count === 0) {
                setMessage("No Property Found");
            } else {
                setMessage("");
            }
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
                <h2>Property Listings Pending Verification </h2>
            </div>
            <div className="subcontainer">
                <div className="card-container">
                    {properties.map((property) => (
                        <PropertyCard key={property.property_id} property={property} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PendingListings;
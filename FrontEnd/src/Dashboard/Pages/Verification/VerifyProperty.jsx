import { useState, useEffect } from "react";
import { ImageApi } from "../../../api/image";
import { Utility } from "../../../utils/utility";
import ImageViewer from "../../../components/ImageViewer/Imageviewer";
import { PropertyApi } from "../../../api/property";
import ImageSwiper from "../Myproperty/Imgaeswiper";
import "./Verification.scss";

function VerifyProperty() {
    const [properties, setProperties] = useState([]);
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState("");
    const [showProperty, setShowProperty] = useState(false);
    const [propertyId, setpropertyId] = useState(null);
    const [docID, setDocID] = useState(null);

    const GetProperty = async () => {
        setMessage("Loading...");
        const { statusCode, data } = await PropertyApi.DashGetPendingAllproperties(1);
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
        <>
            <div className="verification-container">
                <div className="title">
                    <h2>Pending Property Verification</h2>
                </div>
                <div className="subcontainer">
                    {count === 0 && <p>No Active Listings</p>}
                    {
                        showProperty ? <PropertyView setShowProperty={setShowProperty} setPropertyInfo = {setpropertyId} propertyInfo = {propertyId} docID={docID} setDocID={setDocID}/> :
                        <CardContainer properties={properties} setShowProperty={setShowProperty} setPropertyInfo={setpropertyId} setDocId = {setDocID}/>
                    }
                </div>
            </div>
        </>
    );
}

function PropertyCard ({property, setShowProperty, setPropertyInfo, setDocID}){
    const handleClick = () => {
        setShowProperty(true);
        setPropertyInfo(property.property_id);
        setDocID(property.document_id);
    }

    return (
        <div className="card">
            <div className="card-image">
                <img src={ImageApi.GetStaticPropertyImage(property.photo_urls[0])} alt={property.title} />
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{property.title}</h3>
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
                    <button onClick={handleClick} >Expand to verify</button>
                </div>
            </div>
        </div>
    );
}

function CardContainer({ properties, setShowProperty, setPropertyInfo, setDocId }) {
    return (
        <div className="card-container">
            {properties.map((property) => (
                <PropertyCard key={property.property_id} property={property} setShowProperty={setShowProperty} setPropertyInfo={setPropertyInfo} setDocID={setDocId}/>
            ))}
        </div>
    );
}


function PropertyView({ setShowProperty, setPropertyInfo, propertyInfo, docID, setDocID}) {

    const [property, setProperty] = useState({});
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetProperty = async () => {
        console.log(propertyInfo)
        setMessage("Loading...");
        setLoading(true);
        const { statusCode, data } = await PropertyApi.GetPropertyById(propertyInfo);
        if (statusCode === 200) {
            setProperty(data);
            setImages(data.photo_url);

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
                <button onClick={() => {setShowProperty(false); setPropertyInfo(null)}}>Back</button>
            </div>
            <div className="content-body">
                {loading ? <p>Loading...</p> :
                <>
                    <PropertyInfo property={property} images = {images} />
                    
                </>
                }
                <VerificationBox docID={docID} />
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
            <div className="description-box">
                <p className="dstitle">Description</p>
                <p className="dscontent">{property.description}</p>
                <div className="extra-info-box">
                    <div className="column">
                        <div className="content-box">
                            <p className="title">Property Information</p>
                            <div className="content">
                                <table>
                                    <tr>
                                        <td>Property Type</td>
                                        <td>{property.property_category} | For {property.property_type}</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>{property.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Verified</td>
                                        <td>{property.verified ? `True` : `False`}</td>
                                    </tr>
                                    <tr>
                                        <td>Created At</td>
                                        <td>{Utility.formatDate(property.created_at)}</td>
                                    </tr>
                                    <tr>
                                        <td>Updated At</td>
                                        <td>{Utility.formatDate(property.updated_at)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="content-box">
                            <p className="title">Property Facilities</p>
                            <div className="content">
                                <table>
                                    <tr>
                                        <td>Property Size</td>
                                        <td>{property.size} sqft</td>
                                    </tr>
                                    <tr>
                                        <td>Parking Facility</td>
                                        <td>{property.parking_facility ? `Available` : `Not Available`}</td>
                                    </tr>
                                    
                                    { property.property_category ==="house" ? 
                                        <tr>
                                            <td>Total Floors</td>
                                            <td>{property.floor_count}</td>
                                        </tr> :
                                        <tr>
                                            <td>Floor No</td>
                                            <td>{property.floor_no}</td>
                                        </tr>
                                    }

                                    { property.property_category !== "commercial" && (
                                        <>
                                            <tr>
                                                <td>No. of rooms</td>
                                                <td>{property.room_count}</td>
                                            </tr>
                                            <tr>
                                                <td>No. of bathrooms</td>
                                                <td>{property.bathroom_count}</td>
                                            </tr>
                                            <tr>
                                                <td>No. of balconies</td>
                                                <td>{property.balcony_count}</td>
                                            </tr>
                                        </>
                                        
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="content-box">
                        <p className="title">Address</p>
                        <div className="content">
                            <table>
                                <tr>
                                    <td>State</td>
                                    <td>{property.state}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{property.city}</td>
                                </tr>
                                <tr>
                                    <td>Postal Code</td>
                                    <td>{property.postal}</td>
                                </tr>
                                <tr>
                                    <td>Street</td>
                                    <td>Road No. {property.street_no}, {property.street_name}</td>
                                </tr>
                                <tr>
                                    <td>House No.</td>
                                    <td>{property.house_no}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

function VerificationBox({docID}) {
    const [documentID, setDocumentID] = useState(docID);
    const [image, setImage] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [submitted, setSubmitted] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [toggle, setToggle] = useState(false);

    const getDocument = async () => {
        setLoading(true);
        const { statusCode, data } = await PropertyApi.GetDocument(documentID);
        if (statusCode === 200) {
            setImage(data.image);
            setMessage(data.message);
            setStatus(data.status);
            setSubmitted(data.submitted);
            setError("");
            console.log(data);
            
        } else {
            setError(data.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (documentID) {
            console.log(documentID);
            getDocument();
        }
    }, [documentID]);
    return(
        <>
            <div className="verification-box">
                <div className="title-box">
                    <h2>Verification</h2>
                </div>
                <div className="content">
                    {documentID === null && (
                        <>
                            <p>No document has been submitted for verification.</p>
                        </>
                    )}
                    {
                        image && (
                            <>
                                {status === "pending" && (
                                    <div className="message">
                                        <p>Verification status: Pending</p>
                                    </div>
                                )}
                                {status === "rejected" && (
                                    <div className="message">
                                        <p>Document rejectet for the following reasons.</p>
                                        <div className="message-box">
                                            <p>{message}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="document">
                                    <div className="dropdown">
                                        <button onClick={() => setShowImage(!showImage)}>View Document</button>
                                        {showImage && (
                                            <div className="image">
                                                <img src={ImageApi.GetStaticPropertyDocumentImage(image)} alt="document" />

                                                <button onClick={() => setToggle(true)}>Enlarge Image</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {toggle && ( <ImageViewer src={ImageApi.GetStaticPropertyDocumentImage(image)} onClose={() => setToggle(false)} />)}
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}
export default VerifyProperty;
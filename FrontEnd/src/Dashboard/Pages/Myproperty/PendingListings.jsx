import "./Myproperty.scss";
import { PropertyApi } from "../../../api/property";
import { ImageApi } from "../../../api/image";
import { useEffect, useState, useRef } from "react";
import ImageSwiper from "./Imgaeswiper";
import { Utility } from "../../../utils/utility";
import { Cropper } from "react-advanced-cropper";


function PropertyCard ({property, setShowProperty, setPropertyInfo}){
    const handleClick = () => {
        setShowProperty(true);
        setPropertyInfo({
            propertyID: property.property_id,
            documentID: property.document_id,
        });
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
    const [showProperty, setShowProperty] = useState(false);
    const [propertyInfo, setPropertyInfo] = useState({
        propertyID: null,
        documentID: null,
    });

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
                <h2>Active Property Listings</h2>
            </div>
            <div className="subcontainer">
                {count === 0 && <p>No Active Listings</p>}
                {
                    showProperty ? <PropertyView setShowProperty={setShowProperty} setPropertyInfo = {setPropertyInfo} propertyInfo = {propertyInfo} /> :
                    <CardContainer properties={properties} setShowProperty={setShowProperty} setPropertyInfo={setPropertyInfo}/>
                }
                
            </div>
        </div>
    );
}

// Property Card Container
function CardContainer({properties, setPropertyInfo, setShowProperty}) {
    return (
        <div className="card-container">
            {properties.map((property) => (
                <PropertyCard key={property.property_id} property={property} setPropertyInfo = {setPropertyInfo} setShowProperty = {setShowProperty}/>
            ))}
        </div>
    );
}

// Property Expanded View
function PropertyView({ setShowProperty, setPropertyInfo, propertyInfo}) {

    const [property, setProperty] = useState({});
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetProperty = async () => {
        console.log(propertyInfo)
        setMessage("Loading...");
        setLoading(true);
        const { statusCode, data } = await PropertyApi.GetPropertyById(propertyInfo.propertyID);
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
                <button onClick={() => {setShowProperty(false); setPropertyInfo({propertyID: null, documentID:null})}}>Back</button>
            </div>
            <div className="content-body">
                {loading ? <p>Loading...</p> :
                    <PropertyInfo property={property} images = {images} />
                }
                <VerificationBox props = {propertyInfo}/>
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

// Property Verification Part
function ImageModal({setShowModal,submitImagefunc}) {
    const [image, setImage] = useState('');
    const cropperRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async() => {
        setLoading(true);
        if (image) {
            const cropped_image = cropperRef.current.getCanvas().toDataURL()
            const imageData = Utility.imageParser(cropped_image);
            const data = await submitImagefunc(imageData);

            if (data.statusCode === 200) {
                setSubmitted(true);
                setError("");
            } else {
                setSubmitted(false);
                setError(data.error);
            }
        }
        setLoading(false);
    };
    const handleCancel = () => {
        setImage(null);
        setShowModal(false);
    };

    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Upload Profile Image</h2>
                </div>
                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
                {loading ? (
                    <div className="loading">
                        <p>Loading...</p>
                    </div>) : submitted ? (
                    <div className="success-message">
                        <p>Image submitted successfully!</p>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div> ) : (
                    <div className="image-upload">
                        <div className="input">
                            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                            <label htmlFor="image">Choose Image</label>
                        </div>
                        <div className="preview">
                        {image ? (
                            <div className="image-container">
                                <Cropper
                                    ref={cropperRef}
                                    src={image}
                                    className="cropper"
                                    style={{ height: 300, width: 400 }}
                                    cropperOptions={{
                                        aspectRatio: 2/3,

                                    }}
                                    aspectRatio={2/3}
                                />
                            </div>
                        ) : (
                            <div className="no-image">
                                <p>No image selected</p>
                            </div>
                        )}
                            <div className="button-container">
                                <button onClick={handleSubmit}>Ok</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
function VerificationBox({props}) {
    const [documentID, setDocumentID] = useState(props.documentID);
    const [image, setImage] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [submitted, setSubmitted] = useState("");

    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const submitDocumentModal = () => {
        setModal(true);
    }

    const getDocument = async () => {
        setLoading(true);
        const { statusCode, data } = await PropertyApi.GetDocument(documentID);
        if (statusCode === 200) {
            setImage(data.image);
            setMessage(data.message);
            setStatus(data.status);
            setSubmitted(data.submitted);
            setError("");
            
        } else {
            setError(data.error);
        }
        setLoading(false);
    }
    const submitDocumentfunc = async (image) => {
        const payload = {
            property_id: props.propertyID,  
            image: image,
        };
        setLoading(true);
        var error = "";
        const { statusCode, data } = await PropertyApi.SubmitDocument(payload);
        if (statusCode === 200) {
            setDocumentID(data.document_id);
            setMessage(data.message);
            setStatus(data.status);
            setSubmitted(data.submitted);
            setImage(data.image);
            setError("");
        } else {
            setError(data.error);
            error = data.error;
        }
        setLoading(false);
        return {
            statusCode: statusCode,
            error: error,
        }
    }

    useEffect(() => {
        if (documentID) {
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
                            <button onClick={submitDocumentModal}>Submit Document</button>
                        </>
                    )}
                    {
                        image && (
                            <>
                                {status === "pending" && (
                                    <div className="message">
                                        <p>Pending verification. This may take upto 48 hours.</p>
                                    </div>
                                )}
                                {status === "rejected" && (
                                    <div className="message">
                                        <p>Document rejectet for the following reasons. Please review and resubmit.</p>
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
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button onClick={submitDocumentModal}>Resubmit</button>
                            </>
                        )
                    }
                </div>
                { modal && <ImageModal setShowModal={setModal} submitImagefunc={submitDocumentfunc}/> }
            </div>
        </>
    );
}
export default PendingListings;
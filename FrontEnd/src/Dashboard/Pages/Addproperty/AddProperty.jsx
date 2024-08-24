import {useState, useRef, useEffect} from 'react'
import {Cropper} from 'react-advanced-cropper';
import { getID } from '../../../utils/localstorage';
import { PropertyApi } from '../../../api/property';
import Loader from '../../../components/Loader/Loader';

import "./AddProperty.scss"

function ImageModal({setShowModal, setImages, images, modalIndex}) {
    const [image, setImage] = useState('');
    const cropperRef = useRef(null);

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
    const handleConfirm = () => {

        if (image === ""){
            return
        }

        if (cropperRef.current) {
            var new_arr =[ ...images ]
            new_arr[modalIndex] = (cropperRef.current.getCanvas().toDataURL())

            setImages(new_arr)
            setShowModal(false)
        }
        
    }
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
                                    aspectRatio: 72/53, // Set aspect ratio to 1:1 (optional)

                                }}
                                aspectRatio={72/53}
                            />
                        </div>
                    ) : (
                        <div className="no-image">
                            <p>No image selected</p>
                        </div>
                    )}
                        <div className="button-container">
                            <button onClick={handleConfirm}>Ok</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Page1({setSale,sale, setPart}){
    const [error, setError] = useState("")
    const handleGoNext = () => {
        if (sale===null){
            setError("Please select one of the following option")
        } else {
            setError("")
            setPart(2)
        }
    }
    return(
        <div className="content">
            <h3>What is this property for?</h3>
            <div className="form-input">
                <div className="item-container">
                    <div className={`item ${sale===true ? "active" : ""}`}
                    onClick={()=>setSale(true)}>
                        For Sale
                    </div>
                    <div className={`item ${sale===false ? "active" : ""}`}
                    onClick={()=>setSale(false)}>
                        For Rent
                    </div>
                </div>
            </div>
            {error && <div className='error'>{error}</div>}
            <div className="button-container">
                <button className='bck' onClick={()=>handleGoNext()}>Next</button>
            </div>
        </div>
    )
}
function Page2({setPropertytype, propertytype, setPart}){
    const [error, setError] = useState("")
    const handleGoNext = () => {
        if (propertytype===""){
            setError("Please select one of the following option")
        } else {
            setError("")
            setPart(3)
        }
    }
    return(
        <div className="content">
            <h3>What type of property is this?</h3>
            <div className="form-input">
                <div className="item-container">
                    <div className={`item ${propertytype=="house" ? "active" : ""}`}
                    onClick={()=>setPropertytype("house")}>
                        House
                    </div>
                    <div className={`item ${propertytype==="apartment" ? "active" : ""}`}
                    onClick={()=>setPropertytype("apartment")}>
                        Apartment
                    </div>
                    <div className={`item ${propertytype==="commercial" ? "active" : ""}`}
                    onClick={()=>setPropertytype("commercial")}>
                        Commercial
                    </div>
                </div>
            </div>
            {error && <div className='error'>{error}</div>}
            <div className="button-container">
                <button onClick={()=>setPart(1)}>Back</button>
                <button className='bck' onClick={()=>handleGoNext()}>Next</button>
            </div>
        </div>
    )
}
function Page3({setTitle,title, setDescription, description, setPart, price, setPrice}){
    const [error, setError] = useState("")
    const handleGoNext = () => {
        if (title==="" || description ==="" || price === null || price === NaN){
            setError("Please fill up all the following boxes")
        } else {
            setError("")
            setPart(4)
        }
    }
    return(
        <div className="content">
            <h3>Property Setup</h3>
            <div className="form-input">
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='Title of property'
                onChange={(event) => setTitle(event.target.value)} value={title}/>
            </div>
            <div className="form-input">
                <label htmlFor="title">Description</label>
                <textarea name="description" id="description" maxLength={2000} placeholder='Description' value={description} 
                onChange={(event) => setDescription(event.target.value)}/>
            </div>
            <div className="form-input">
                <label htmlFor="price">Price</label>
                <input type="number" min={0} max={1000000000} placeholder='price' id='price'
                onChange={(event) => setPrice(parseInt(event.target.value))} value={price}/>
            </div>
            {error && <div className='error'>{error}</div>}
            <div className="button-container">
                <button onClick={()=>setPart(2)}>Back</button>
                <button className='bck' onClick={()=>handleGoNext()}>Next</button>
            </div>
        </div>
    )
}
function Page4({location, setPart}){
    const [error, setError] = useState("")
    const handleGoNext = () => {
        if (location.houseNo==="" || 
            location.postal ==="" || 
            location.city === "" || 
            location.streetName === "" || 
            location.streetNo==="" || 
            location.state === "" ){
            setError("Please fill up all the following boxes")
        } else {
            setError("")
            setPart(5)
        }
    }
    return(
        <div className="content">
            <h3>Set Property Location</h3>
            <div className="form-input">
                <div className="grid-row">
                    <div className="grid-item">
                        <label htmlFor="state">State</label>
                        <input type="text" id='state' placeholder='State'
                        onChange={(event) => location.setState(event.target.value)} value={location.state}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="city">City</label>
                        <input type="text" id='city' placeholder='City Name'
                        onChange={(event) => location.setCity(event.target.value)} value={location.city}/>
                    </div>

                </div>
            </div>
            <div className="form-input">
                <div className="grid-row">
                    <div className="grid-item">
                        <label htmlFor="postal">Postal Code</label>
                        <input type="text" id='postal' placeholder='Postal Code'
                        onChange={(event) => location.setPostal(event.target.value)} value={location.postal}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="stno">Street No</label>
                        <input type="text" id='stno' placeholder='Street No'
                        onChange={(event) => location.setStreetNo(event.target.value)} value={location.streetNo}/>
                    </div>

                </div>
            </div>
            <div className="form-input">
                <div className="grid-row">
                    <div className="grid-item">
                        <label htmlFor="stname">Street Name</label>
                        <input type="text" id='stname' placeholder='Street Name'
                        onChange={(event) => location.setStreetName(event.target.value)} value={location.streetName}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="houseno">House No</label>
                        <input type="text" id='houseno' placeholder='House No'
                        onChange={(event) => location.setHouseNo(event.target.value)} value={location.houseNo}/>
                    </div>

                </div>
            </div>
            {error && <div className='error'>{error}</div>}
            <div className="button-container">
                <button onClick={()=>setPart(3)}>Back</button>
                <button className='bck' onClick={()=>handleGoNext()}>Next</button>
            </div>
        </div>
    )
}
function Page5({feature, setPart, type}){
    const [error, setError] = useState("")
    const handleGoNext = () => {
        var isvalid = true
        if (feature.parking===null || feature.size === null){
            setError("Please fill up all of the following fields")
            isvalid = false
        }
        if (type !== "commercial"){
            if (feature.roomCount === null || feature.bathroomCount === null || feature.balconyCount === null){
                setError("Please fill up all of the following fields")
                isvalid = false
            }
        } 

        if (type === "house"){
            if (feature.floorCount === null){
                setError("Please fill up all of the following fields")
                isvalid = false
            }
        } else {
            if (feature.floorNo === null) {
                setError("Please fill up all of the following fields")
                isvalid = false
            }
        }
        if (isvalid) {
            setError("")
            setPart(6)
        }
    }

    return(
        <div className="content">
            <h3>Add your Property Features</h3>
            <div className="form-input">
                <label htmlFor="psize">Property size in sqft</label>
                <input type="number" min={100} max={10000} placeholder='Property Size' id='psize'
                onChange={(event) => feature.setSize(parseInt(event.target.value))} value={feature.size}/>
            </div>
            <div className="form-input">
                <label htmlFor="parking">Parking facility</label>
                <div className="item-container">
                    <div className={`item ${feature.parking===true ? "active" : ""}`}
                    onClick={()=>feature.setParking(true)}>
                        Available
                    </div>
                    <div className={`item ${feature.parking===false ? "active" : ""}`}
                    onClick={()=>feature.setParking(false)}>
                        Not Available
                    </div>
                </div>
            </div>
            
            {type !== "commercial" && (
                <>
                    <div className="form-input">
                        <label htmlFor="roomno">Number of Rooms</label>
                        <input type="number" min={1} max={50} placeholder='Number of Rooms' id='roomno'
                        onChange={(event) => feature.setRoomCount(parseInt(event.target.value))} value={feature.roomCount}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="bathroomno">Number of Bathrooms</label>
                        <input type="number" min={1} max={50} placeholder='Number of Bathrooms' id='bathroomno'
                        onChange={(event) => feature.setBathroomCount(parseInt(event.target.value))} value={feature.bathroomCount}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="balconyno">Number of Balconies</label>
                        <input type="number" min={1} max={50} placeholder='Number of Balconies' id='balconyno'
                        onChange={(event) => feature.setBalconyCount(parseInt(event.target.value))} value={feature.balconyCount}/>
                    </div>
                </>
            )}
            {type === "house" ? (
                <div className="form-input">
                    <label htmlFor="floorcount">Number of Floors</label>
                    <input type="number" min={1} max={50} placeholder='Number of Floors' id='floorcount'
                    onChange={(event) => feature.setFloorCount(parseInt(event.target.value))} value={feature.floorCount}/>
                </div>
            ) : (
                <div className="form-input">
                    <label htmlFor="floorno">Floor No</label>
                    <input type="number" min={1} max={50} placeholder='Floor No' id='floorno'
                    onChange={(event) => feature.setFloorNo(parseInt(event.target.value))} value={feature.floorNo}/>
                </div>
            )}
            
            {error && <div className='error'>{error}</div>}
            <div className="button-container">
                <button onClick={()=>setPart(4)}>Back</button>
                <button className='bck' onClick={()=>handleGoNext()}>Next</button>
            </div>
        </div>
    )
    
}
function Page6({images, setImages, setPart}) {
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(0)

    const handleGoNext = () => {
        console.log(images.length)
        if (images.length < 2){
            setError("Please upload atleast 2 image")
        } else {
            setError("")
            setPart(7)
        }
    }
    return(
        <div className="content">
            <h3>Upload few Images</h3>
            <div className="image-boxes">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="image-box" onClick={()=>setModalIndex(index)}>
                    {images[index] ? (
                        <img src={images[index]} alt="property" />
                    ) : (
                        <div className="empty" onClick={() => setShowModal(true)}>Add Image</div>
                    )}
                </div>
            ))}
            
            </div>
            {showModal && <ImageModal setShowModal={setShowModal} setImages={setImages} images={images} modalIndex={modalIndex} />}
            {error && <div className='error'>{error}</div>}
            <div className="button-container">
                <button onClick={()=>setPart(5)}>Back</button>
                <button className='bck' onClick={()=>handleGoNext()}>Next</button>
            </div>
        </div>
    )
}

function Page7({primary, location, feature, images, setPart, setImages}){
    const [image, setImage]=useState([])
    const [prvimg, setPrvimg] = useState([])
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const [submit, setSubmit] = useState(false)
    const HousePayload = {
        "owner_id" : parseInt(getID()),
        "title" : primary.title,
        "description" : primary.description,
        "price" : primary.price,
        "property_type" : (primary.sale ? "sale" : "rent"),
        "property_category" : primary.propertytype,
        "state" : location.state,
        "city" : location.city,
        "postal_code": location.postal,
        "street_no" : parseInt(location.streetNo),
        "street_name": location.streetName,
        "house_no" : parseInt(location.houseNo),
        "room_count" : feature.roomCount,
        "bathroom_count": feature.bathroomCount,
        "size": feature.size,
        "balcony_count": feature.balconyCount,
        "parking": feature.parking,
        "floor_count": feature.floorCount,
        "image": image
    }
    const ApartmentPayload = {
        "owner_id" : parseInt(getID()),
        "title" : primary.title,
        "description" : primary.description,
        "price" : primary.price,
        "property_type" : (primary.sale ? "sale" : "rent"),
        "property_category" : primary.propertytype,
        "state" : location.state,
        "city" : location.city,
        "postal_code": location.postal,
        "street_no" : parseInt(location.streetNo),
        "street_name": location.streetName,
        "house_no" : parseInt(location.houseNo),
        "room_count" : feature.roomCount,
        "bathroom_count": feature.bathroomCount,
        "size": feature.size,
        "balcony_count": feature.balconyCount,
        "parking": feature.parking,
        "floor_no": feature.floorNo,
        "image": image
    }
    const CommercialPayload = {
        "owner_id" : parseInt(getID()),
        "title" : primary.title,
        "description" : primary.description,
        "price" : primary.price,
        "property_type" : (primary.sale ? "sale" : "rent"),
        "property_category" : primary.propertytype,
        "state" : location.state,
        "city" : location.city,
        "postal_code": location.postal,
        "street_no" : parseInt(location.streetNo),
        "street_name": location.streetName,
        "house_no" : parseInt(location.houseNo),
        "size": feature.size,
        "parking": feature.parking,
        "floor_no": feature.floorNo,
        "image": image
    }
    const handleAddanother = () => {
        setSubmit(false)
        setPart(1)
        setImages([])
        primary.setSale(null)
        primary.setPropertytype("")
        primary.setDescription("")
        primary.setPrice(null)
        primary.setTitle("")
        location.setState("")
        location.setCity("")
        location.setPostal("")
        location.setStreetNo("")
        location.setStreetName("")
        location.setHouseNo("")
        feature.setRoomCount(null)
        feature.setBathroomCount(null)
        feature.setBalconyCount(null)
        feature.setFloorCount(null)
        feature.setFloorNo(null)
        feature.setSize(null)
        feature.setParking(null)

    }
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setSubmit(true)
        var Payload;

        if (primary.propertytype === "house"){
            Payload = HousePayload
        } else if (primary.propertytype ==="apartment"){
            Payload = ApartmentPayload
        } else if (primary.propertytype === "commercial"){
            Payload = CommercialPayload
        } 

        setStatus("loading")
        console.log(image)
        const {statusCode, data} = await PropertyApi.AddProperty(Payload);

        if (statusCode === 200) {
            setStatus("Success");
            setMessage("Property Added Successfully");
        }
        else {
            setStatus("Failed");
            setMessage(data.error);
        }
    }
    useEffect(()=>{
        var arr =[]
        var prv = []
        images.map((img)=>{
            if (img){
                const base64Image = img.split(',')[1]
                prv.push(img)
                arr.push(base64Image)
            }
        })
        setPrvimg(prv)
        setImage(arr)
    },[])
    console.log(images.length)
    return(
        <div className="content">
            <h3>Submit Information</h3>
            <div className="preview">
                <div className="title">
                    <h4>{primary.title}</h4>
                </div>
                <div className="image-boxes">
                    {prvimg.map((img, i) => (
                        <div className="image-box" key={i}>
                            <img src={img} alt="" />
                        </div>
                    ))}
                </div>
                <div className="basic-info">
                    <div className='type'><p>{primary.propertytype}</p></div>
                    <div className='sale'><p>{primary.sale ? (`Sale`) : (`Rent`)}</p></div>
                    <div className="price">
                        <p> ৳ {primary.price}</p>
                    </div>
                    
                </div>
                <div className="description">
                    <p className="dstitle">Description</p>
                    <p className='dscontent'>{primary.description}</p>
                </div>
                <div className="prev-container-1">
                    <p className="subt">Address</p>
                    <div className="addrbox">
                        <p className="bold">Location</p><p className="value">{location.city}, {location.state}</p>
                        <p className="bold">Zip code</p><p className="value">{location.postal}</p>
                        <p className="bold">Street</p><p className="value">Road {location.streetNo}, {location.streetName}</p>
                        <p className="bold">House no</p><p className="value">{location.houseNo}</p>
                    </div>
                </div>

                <div className="prev-container-1">
                    <p className="subt">Features</p>
                    <div className="addrbox">
                        <p className="bold">Size of property</p><p className="value">{feature.size} sqft</p>
                        {primary.propertytype !== "commercial" && (
                            <>
                                <p className="bold">No. of rooms</p><p className="value">{feature.roomCount}</p>
                                <p className="bold">No. of balconies</p><p className="value">{feature.balconyCount}</p>
                                <p className="bold">No. of bathrooms</p><p className="value">{feature.bathroomCount}</p>
                            </>
                        )}
                        <p className="bold">Parking facility</p><p className="value">{feature.parking ? ("Available") :("Not Available")}</p>
                        {primary.propertytype === "house" ? (
                            <>
                                <p className="bold">Total floors</p><p className="value">{feature.floorCount}</p>
                            </>
                        ):(
                            <>
                                <p className="bold">Floor number</p><p className="value">{feature.floorNo}</p>
                            </>
                        )}
                    </div>
                </div>
                {submit &&
                <div className="submit-container">
                    {status=== "loading" ?(
                        <Loader/>
                    ):(<div className='status'><p>{status}</p></div>)}
                    {message && <p className="message">{message}</p>}
                    {status==="Success" && <p className='message'>Now verify your property by visiting the my property section.</p>}
                    {status === "Success" && <button onClick={()=>handleAddanother()}>Add Another</button>}
                    {status ==="Failed" && <button onClick={()=>setSubmit(!submit)}>Try Again</button>}
                </div>
                }
                <div className="button-container">

                    <button onClick={()=>setPart(6)}>Back</button>
                    <button className="bck" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}
function AddProperty() {
    const [part, setPart] = useState(1)

    const [sale, setSale] = useState(null)
    const [propertytype,setPropertytype] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(null)

    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [postal, setPostal] = useState("")
    const [streetNo, setStreetNo] = useState("")
    const [streetName, setStreetName] = useState("")
    const [houseNo, setHouseNo] = useState("")

    const [roomCount, setRoomCount] = useState(null)
    const [bathroomCount, setBathroomCount] = useState(null)
    const [balconyCount, setBalconyCount] = useState(null)
    const [floorCount, setFloorCount] = useState(null)
    const [floorNo, setFloorNo] = useState(null)
    const [size, setSize] = useState(null)
    const [parking, setParking] = useState(null)
    const [images, setImages] = useState([])

    const basicInfo = {
        sale,setSale,
        propertytype, setPropertytype,
        title, setTitle,
        description,setDescription,
        price, setPrice
    }
    const location = {
        state, setState,
        city, setCity,
        postal, setPostal,
        streetNo, setStreetNo,
        streetName, setStreetName,
        houseNo, setHouseNo
    }
    const feature = {
        roomCount, setRoomCount,
        bathroomCount, setBathroomCount,
        balconyCount, setBalconyCount,
        floorCount, setFloorCount,
        floorNo, setFloorNo,
        size, setSize,
        parking, setParking
    }
    
    return (
        <>
            <div className="addproperty-container">
                <div className="title">
                    <h2>Add Property</h2>
                </div>
                
                <div className="subcontainer">
                    {part===1 && (
                        <Page1 setPart={setPart} sale={sale} setSale={setSale} />
                    )}
                    {part===2 && (
                        <Page2 setPropertytype={setPropertytype} propertytype={propertytype} setPart={setPart} />
                    )}
                    {part===3 && (
                        <Page3  description={description} title={title} setTitle={setTitle} setDescription={setDescription} setPart={setPart} price={price} setPrice = {setPrice} />
                    )}
                    {part===4 && (
                        <Page4  location = {location} setPart={setPart} />
                    )}
                    {part===5 && (
                        <Page5  feature = {feature} setPart={setPart} type={propertytype} />
                    )}
                    {part===6 && (
                        <Page6   setImages={setImages} images={images} setPart={setPart}/>
                    )}
                    {part ===7 &&(
                        <Page7 primary={basicInfo} location={location} feature={feature} images={images} setImages={setImages} setPart = {setPart} />
                    )}
                </div>
            </div>
        </>
    );
}

export default AddProperty;
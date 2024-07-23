import {useState} from 'react'


import "./AddProperty.scss"
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
function Page3({setTitle,title, setDescription, description, setPart}){
    const [error, setError] = useState("")
    const handleGoNext = () => {
        if (title==="" || description ===""){
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
    return(
        <div className="content">
            <h3>Upload few Images</h3>
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
                        <Page3  description={description} title={title} setTitle={setTitle} setDescription={setDescription} setPart={setPart} />
                    )}
                    {part===4 && (
                        <Page4  location = {location} setPart={setPart} />
                    )}
                    {part===5 && (
                        <Page5  feature = {feature} setPart={setPart} type={propertytype} />
                    )}
                    {part===6 && (
                        <Page6   setPart={setPart} />
                    )}
                </div>
            </div>
        </>
    );
}

export default AddProperty;
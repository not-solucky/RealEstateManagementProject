import { useState, useEffect } from "react";
import { PropertyApi } from "../../api/property";
import { ImageApi } from "../../api/image";
import "./AllPropertyPage.scss";

function Card ({props}){
    return (
        <div className="card">
            <div className="card-image">
                <img src={ImageApi.GetStaticPropertyImage(props.photo_url)} alt={props.title} />
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="address">
                    <p>{props.city}, {props.state}</p>

                </div>
                <div className="card-footer">
                    <div className="price-box">
                        <p>Price</p>
                        <h2>{props.price}</h2>
                    </div>
                    <button>Property Details</button>
                </div>
            </div>
        </div>
    );
}

function SalePage() {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({
        category: "all",
        state   : "",
        city    : "",
        priceMin: "",
        priceMax: "",
        search  : "",
        Limit   : 24,
        page    : 1,
    });
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const GetProperty = async () => {
        const { statusCode, data } = await PropertyApi.GetSaleProperties(filters);
        if (statusCode === 200) {
            setProperties(data.properties);
            if (data.length === 0) {
                setMessage("No Property Found");
            } else {
                setMessage("");
                setTotalPage(Math.ceil(data.count/filters.Limit));
                
            }
        } else {
            setMessage(data.error);
        }
    };
    const handleFilter = () => {
        setFilters({
            ...filters,
            page: 1,
        });
        GetProperty();
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    useEffect(() => {
        handleFilter();
    }
    , []);


    return (
        <>
            <div className="prop-disp-section">
                <div className="background-container">
                    <div className="background"></div>
                    <div className="search-container">
                        
                        <div className="filter-item">
                            <h2>Buy your Dream Property</h2>
                            <div className="search">
                                <input 
                                    type="text" 
                                    name="search" 
                                    value={filters.search} 
                                    placeholder="Search Property" 
                                    onChange={handleInputChange}
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                            handleFilter();
                                        }
                                    }
                                } 
                                />
                                <div className="button-container">
                                    <button onClick={handleFilter}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="filter-container">
                        <div className="filter-item">
                            <label>Category</label>
                            <select name="category" value={filters.category} onChange={handleInputChange}>
                                <option value="all">All</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="commercial">Commercial</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>State</label>
                            <input 
                                type="text" 
                                name="state" 
                                value={filters.state} 
                                placeholder="State" 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="filter-item">
                            <label>City</label>
                            <input 
                                type="text" 
                                name="city" 
                                value={filters.city} 
                                placeholder="City" 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="filter-item">
                            <label>Price Range</label>
                            <div className="price-range">
                                <input 
                                    type="number" 
                                    name="priceMin" 
                                    value={filters.priceMin} 
                                    placeholder="Min" 
                                    onChange={handleInputChange} 
                                />
                                <input 
                                    type="number" 
                                    name="priceMax" 
                                    value={filters.priceMax} 
                                    placeholder="Max" 
                                    onChange={handleInputChange} 
                                />
                            </div>
                        </div>
                        
                        <div className="filter-item">
                            <button onClick={handleFilter}>Filter</button>
                        </div>
                    </div>
                    <div className="card-container">
                        {properties.map((property, index) => {
                            return <Card key={index} props={property} />
                        })}
                        
                    </div>
                    {message && <div className="message"><p>{message}</p></div>}
                </div>
            </div>
        </>
    );
}

export default SalePage;
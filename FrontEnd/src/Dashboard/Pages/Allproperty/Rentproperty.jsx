import {useState, useEffect} from 'react';
import { PropertyApi } from "../../../api/property";
import "./Adminallproperty.scss";

function Adminrentproperty() {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [message, setMessage] = useState("");

    const [filters, setFilters] = useState({ 
        category: 'all', 
        status: 'all',
        verified: 'all',
        priceMin: "",
        priceMax: "",
        state: "",
        city: "",
        search: "",
        page: 1,
        type: "rent",
        Limit: 15,

    });

    const handleFilter = () => {
        setFilters({
            ...filters,
            page: 1,
        });
        setPage(1);
        GetProperty();
    };
    const ScrolltoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const GetProperty = async () => {
        setMessage("Loading...");
        const { statusCode, data } = await PropertyApi.AdminGetAllProperty(filters);
        if (statusCode === 200) {
            setProperties(data.properties);
            console.log(data);
            if (data.length === 0) {
                setMessage("No Property Found");
            } else {
                setMessage("");
                setTotalPage(Math.ceil(data.count / filters.Limit));
            }
        } else {
            setMessage(data.error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };
    useEffect(() => {
        // Fetch properties data from an API or define it here
        GetProperty();
    }, []);
    return (
        <div className="allproperty-container">
            <div className="title">
                <h2>All Properties for Rent</h2>
            </div>
            <div className="subcontainer">

                <div className="filter">
                    <div className="row">
                        <div className="option-groups">
                            <div className="filter-group">
                                <label htmlFor="type">Type</label>
                                <select name="category" id="type" value={filters.category} onChange={handleInputChange}>
                                    <option value="all">All</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="house">House</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="status">Status</label>
                                <select name="status" id="status" value={filters.status} onChange={handleInputChange}>
                                    <option value="all">All</option>
                                    <option value="available">Available</option>
                                    <option value="rented">Rented</option>
                                    <option value="pending_verification">Pending Verification</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="verified">Verified</label>
                                <select name="verified" id="verified" value={filters.verified} onChange={handleInputChange}>
                                    <option value="all">All</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="field-groups">
                            <div className="field-group">
                                <label htmlFor="min-price">Min Price</label>
                                <input type="number" name="priceMin" id="min-price" min={100} value={filters.priceMin} onChange={handleInputChange} placeholder='Min price'/>
                            </div>
                            <div className="field-group">
                                <label htmlFor="max-price">Max Price</label>
                                <input type="number" name="priceMax" id="max-price" min={100} value={filters.priceMax} onChange={handleInputChange} placeholder='Max price'/>
                            </div>
                            <div className="field-group">
                                <label htmlFor='state'>State</label>
                                <input type="text" name="state" id="state" value={filters.state} onChange={handleInputChange} placeholder='State'/>
                            </div>
                            <div className="field-group">
                                <label htmlFor='city'>City</label>
                                <input type="text" name="city" id="city" value={filters.city} onChange={handleInputChange} placeholder='City'/>
                            </div>
                        </div>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search by title" name="search" value={filters.search} onChange={handleInputChange}/>
                        <button
                            onClick={handleFilter}
                        >Search</button>
                    </div>
                    
                </div>
                <table className='property-table'>
                    <thead className='table-header'>
                        <tr >
                            <th>ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Rent</th>
                            <th>Status</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {properties.map(property => (
                            <tr key={property.property_id} >
                                <td>{property.property_id}</td>
                                <td>{property.title}</td>
                                <td>{property.property_category}</td>
                                <td>{property.price}</td>
                                <td>{property.status}</td>
                                <td>{property.is_verified ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {message && (
                    <div className="message">
                        <p>{message}</p>
                    </div>
                )}
                <div className="pagination">
                    <div className="count">
                        <p>Page {page} of {totalPage}</p>
                    </div>
                    <div className="button-container">
                        <button 
                            className={`${page !== 1 ? 'enabled' : ''}`}
                            onClick={() => {
                                if (page > 1) {
                                    setPage(page - 1);
                                    setFilters({
                                        ...filters,
                                        page: page - 1,
                                    });
                                    GetProperty();
                                    ScrolltoTop();
                                }
                            }}
                        >
                            Previous
                        </button>
                        
                        <button 
                            className={`${page !== totalPage ? 'enabled' : ''}`}
                            onClick={() => {
                                if (page < totalPage) {
                                    setPage(page + 1);
                                    setFilters({
                                        ...filters,
                                        page: page + 1,
                                    });
                                    GetProperty();
                                    ScrolltoTop();
                                }
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adminrentproperty;
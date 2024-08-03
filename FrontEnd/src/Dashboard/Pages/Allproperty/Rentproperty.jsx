import {useState, useEffect} from 'react';
import "./Adminallproperty.scss";

function Adminrentproperty() {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({ 
        type: 'all', 
        status: 'all',
        verified: 'all',
    });
    useEffect(() => {
        // Fetch properties data from an API or define it here
        const fetchedProperties = [
            { id: 1, title: 'Luxury Apartment', type: 'Apartment', price: 1200, status: 'Available', verified: true },
            { id: 2, title: 'Cozy House', type: 'House', price: 1500, status: 'Rented', verified: false },
            // Add more properties here
        ];
        setProperties(fetchedProperties);
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
                                <select name="type" id="type">
                                    <option value="all">All</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="house">House</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="status">Status:</label>
                                <select name="status" id="status">
                                    <option value="all">All</option>
                                    <option value="available">Available</option>
                                    <option value="rented">Rented</option>
                                    <option value="pending_verification">Pending Verification</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="verified">Verified:</label>
                                <select name="verified" id="verified">
                                    <option value="all">All</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="field-groups">
                            <div className="field-group">
                                <label htmlFor="min-price">Min Price:</label>
                                <input type="number" name="min-price" id="min-price" min={100}/>
                            </div>
                            <div className="field-group">
                                <label htmlFor="max-price">Max Price:</label>
                                <input type="number" name="max-price" id="max-price" min={100}/>
                            </div>
                            <div className="field-group">
                                <label htmlFor='state'>State:</label>
                                <input type="text" name="state" id="state"/>
                            </div>
                            <div className="field-group">
                                <label htmlFor='city'>City:</label>
                                <input type="text" name="city" id="city"/>
                            </div>
                        </div>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search by title"/>
                        <button>Search</button>
                    </div>
                    
                </div>
                <table className='property-table'>
                    <thead className='table-header'>
                        <tr >
                            <th>ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {properties.map(property => (
                            <tr key={property.id} >
                                <td>{property.id}</td>
                                <td>{property.title}</td>
                                <td>{property.type}</td>
                                <td>{property.price}</td>
                                <td>{property.status}</td>
                                <td>{property.verified ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Adminrentproperty;
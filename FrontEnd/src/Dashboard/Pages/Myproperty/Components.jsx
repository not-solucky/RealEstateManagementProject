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

export {Card}
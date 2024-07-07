import "./alert.scss";

function Alert({payload, func}) {
    return (
        <>
        <div className="popup-container">
            <div className="message-field">
                <p>{payload}</p>
            </div>

            <button className="popup-button" onClick={() => func(false)}>Okay</button>

        </div>
        </>
    );
}

export default Alert;
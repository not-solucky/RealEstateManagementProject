function ErrorComponent({error}) {
    return (
        <>
            <div className="error-container">
                <div className="error">
                    <h2>Error: {error}</h2>
                </div>
            </div>
        </>
    );
}

export default ErrorComponent;
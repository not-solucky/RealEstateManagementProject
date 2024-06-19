import "./hero.css"

function Hero() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-title">
                        <h1>Discover Your Dream Property with our Service</h1>
                        <p>Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</p>
                    </div>

                    <div className="button-container">
                        <button className="button-1">Learn More</button>
                        <button className="button-2">Browse Properties</button>
                    </div>
                </div>
                <div className="image-content">
                    <img src="/heroimage.jpg" alt="Building Image"></img>
                </div>
            </div>
        </section>
    );
}

export default Hero;
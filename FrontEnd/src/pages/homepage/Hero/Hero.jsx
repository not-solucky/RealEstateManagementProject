import "./hero.css"
import { NavLink } from "react-router-dom";

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
                        <NavLink to = "/services" className={"button button-1"}>Learn More </NavLink>
                        <NavLink to = "/properties" className={"button button-2"}>Browse Properties </NavLink>
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
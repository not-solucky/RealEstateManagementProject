CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('client', 'admin') NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CREATE TABLE Roles (
--     role_id INT PRIMARY KEY AUTO_INCREMENT,
--     role_name ENUM('buyer', 'seller', 'admin') NOT NULL
-- )

-- INSERT INTO Roles (role_name) VALUES ('buyer'), ('seller'), ('admin')

-- CREATE TABLE UserRoles (
--     user_id INT NOT NULL,
--     role_id INT NOT NULL,
--     PRIMARY KEY (user_id, role_id),
--     FOREIGN KEY (user_id) REFERENCES Users(user_id),
--     FOREIGN KEY (role_id) REFERENCES Roles(role_id)
-- )

CREATE TABLE UserDocuments (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    document_type ENUM('passport', 'driver_license', 'identity_card') NOT NULL,
    document_url VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Property related tables --

CREATE TABLE Properties (
    property_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    property_type ENUM('sale', 'rent') NOT NULL,
    property_category ENUM('house', 'apartment', 'commercial') NOT NULL,

    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    street_no INT NOT NULL,
    street_name VARCHAR(100) NOT NULL,
    house_no INT,

    room_count INT,
    bathroom_count INT,
    size INT,
    balcony_count INT,
    parking_facility BOOLEAN,
    floor_no INT,
    floor_count INT,

    status ENUM('available', 'sold', 'rented', 'pending_verification') NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

CREATE TABLE PropertyDocuments (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    document_url VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES Properties(property_id)
);

CREATE TABLE PropertyPhotos (
    photo_id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES Properties(property_id)
);

CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    buyer_id INT,
    renter_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type ENUM('purchase', 'rent') NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES Properties(property_id),
    FOREIGN KEY (buyer_id) REFERENCES Users(user_id),
    FOREIGN KEY (renter_id) REFERENCES Users(user_id)
);

CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT NOT NULL,
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'failed') NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES Transactions(transaction_id)
);

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES Properties(property_id),
    FOREIGN KEY (reviewer_id) REFERENCES Users(user_id)
);

CREATE TABLE featured_properties (
    property_id INT PRIMARY KEY,
    FOREIGN KEY (property_id) REFERENCES Properties(property_id)
);





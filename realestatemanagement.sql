-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 13, 2024 at 03:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realestatemanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `featured_properties`
--

CREATE TABLE `featured_properties` (
  `property_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `payment_method` enum('credit_card','paypal','bank_transfer') NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `property_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `property_type` enum('sale','rent') NOT NULL,
  `property_category` enum('house','apartment','commercial') NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `street_no` int(11) NOT NULL,
  `street_name` varchar(100) NOT NULL,
  `house_no` int(11) DEFAULT NULL,
  `room_count` int(11) DEFAULT NULL,
  `bathroom_count` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `balcony_count` int(11) DEFAULT NULL,
  `parking_facility` tinyint(1) DEFAULT NULL,
  `floor_no` int(11) DEFAULT NULL,
  `floor_count` int(11) DEFAULT NULL,
  `status` enum('available','sold','rented','pending_verification') NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`property_id`, `owner_id`, `title`, `description`, `price`, `property_type`, `property_category`, `state`, `city`, `postal_code`, `street_no`, `street_name`, `house_no`, `room_count`, `bathroom_count`, `size`, `balcony_count`, `parking_facility`, `floor_no`, `floor_count`, `status`, `is_verified`, `created_at`, `updated_at`) VALUES
(5, 1, 'Dream Property', 'Welcome to your dream home! This stunning property offers the perfect blend of comfort, style, and convenience. Nestled in a peaceful suburban neighborhood, this house is ideal for families looking for a spacious and inviting living space.', 20000.00, 'rent', 'house', 'Dhaka', 'Demra', '1361', 23, 'Some road', 32, 9, 3, 2000, 3, 1, NULL, 1, 'available', 1, '2024-07-29 02:22:57', '2024-07-31 09:52:50'),
(6, 1, 'Some Apartment', 'This is some kind of Apartment for sale.', 8000000.00, 'sale', 'apartment', 'Dhaka', 'Uttara', '2345', 32, 'a road ', 35, 9, 3, 2000, 3, 1, 7, NULL, 'available', 1, '2024-07-29 07:25:26', '2024-07-31 09:53:06'),
(7, 1, 'Example Commercial porperty', 'This is  a example commercial property', 20000.00, 'sale', 'commercial', 'Dhaka', 'Demra', '23454', 23, 'Example road', 234, NULL, NULL, 2000, NULL, 1, NULL, 4, 'available', 1, '2024-07-29 12:16:38', '2024-07-31 09:53:13'),
(8, 1, 'Test Property', 'This is a basic example to get you started. You might need to add more error handling, validations, and improve the way files are saved and URLs are generated based on your specific requirements.', 32000.00, 'sale', 'apartment', 'Dhaka', 'Demra', '2354', 12, 'Some road', 45, 9, 3, 2000, 3, 1, 6, NULL, 'available', 1, '2024-07-29 16:57:24', '2024-07-31 11:31:02'),
(9, 1, 'This is a test rent property', 'Description of the test rent property.', 10000.00, 'rent', 'apartment', 'Dhaka', 'Dhanmondi', '3284', 23, 'Some road', 34, 10, 4, 2000, 4, 1, 6, NULL, 'available', 0, '2024-08-02 15:09:24', '2024-08-03 15:01:44');

-- --------------------------------------------------------

--
-- Table structure for table `propertydocuments`
--

CREATE TABLE `propertydocuments` (
  `document_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `document_url` varchar(255) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `status` enum('completed','rejected','pending') NOT NULL,
  `message` text DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `propertyphotos`
--

CREATE TABLE `propertyphotos` (
  `photo_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `propertyphotos`
--

INSERT INTO `propertyphotos` (`photo_id`, `property_id`, `photo_url`, `created_at`) VALUES
(18, 5, '1198300e-d3a2-4d2c-845c-b0e85bf9748f.png', '2024-07-29 02:22:57'),
(19, 5, '9546b3c1-a080-43d7-b139-1276b1e78120.png', '2024-07-29 02:22:57'),
(20, 5, 'd25d019b-07d4-4673-8546-b79a71d044d2.png', '2024-07-29 02:22:57'),
(21, 5, '656cca83-2709-426a-9181-2ce2e78b2e0a.png', '2024-07-29 02:22:57'),
(22, 6, '9c15ab74-3da7-4da4-9a04-61a2628c066a.png', '2024-07-29 07:25:26'),
(23, 6, '50769e51-8bad-4a23-8c79-8b0fde367515.png', '2024-07-29 07:25:26'),
(24, 7, '86b715aa-24a5-41ca-b630-2c5cb12c7698.png', '2024-07-29 12:16:38'),
(25, 7, '8ce232cd-3ade-40b7-ba42-26c0b11ba003.png', '2024-07-29 12:16:38'),
(26, 8, '278c9ed4-1dd2-41e1-8ef1-25310871fe5f.png', '2024-07-29 16:57:24'),
(27, 8, '077acb99-09b6-4052-9d45-5cf3354a68ef.png', '2024-07-29 16:57:24'),
(28, 8, '0f517d70-4860-44c7-aa4d-2a17dd5bb45d.png', '2024-07-29 16:57:24'),
(29, 8, '459c5f11-b542-48fa-b5e7-bb87f793defa.png', '2024-07-29 16:57:24'),
(30, 8, 'd24aea22-be06-4640-b38d-e040c4244ee0.png', '2024-07-29 16:57:24'),
(31, 8, '12a285d2-c99c-4c13-a455-5f65aa601a89.png', '2024-07-29 16:57:24'),
(32, 8, '94c2ce0f-e6fe-4eee-8b67-3214efb2ef23.png', '2024-07-29 16:57:24'),
(34, 9, '0c453bcf-7489-4160-9a75-c1c94ade9ebc.png', '2024-08-02 15:09:24');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `reviewer_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `review_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `buyer_id` int(11) DEFAULT NULL,
  `renter_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_type` enum('purchase','rent') NOT NULL,
  `status` enum('pending','completed','cancelled') NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userdocuments`
--

CREATE TABLE `userdocuments` (
  `document_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `document_type` enum('passport','driver_license','identity_card') NOT NULL,
  `document_url` varchar(255) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `status` enum('completed','rejected','pending') NOT NULL,
  `message` text DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` enum('client','admin') NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `phone_number`, `image`, `role`, `is_verified`, `created_at`, `updated_at`) VALUES
(1, 'NestNavigator Admin', 'admin@nestnavigator.com', 'admin123', '01632195153', '3b3ca3cd-085a-4fc0-bb27-2727acd7a8ac.png', 'admin', 1, '2024-07-28 01:02:40', '2024-07-29 02:19:53'),
(2, 'Rafi', 'rafi@email.com', 'rafi1234', '01739457934', 'null', 'client', 0, '2024-07-28 01:04:38', '2024-07-28 01:04:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `featured_properties`
--
ALTER TABLE `featured_properties`
  ADD PRIMARY KEY (`property_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`property_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `propertydocuments`
--
ALTER TABLE `propertydocuments`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `propertyphotos`
--
ALTER TABLE `propertyphotos`
  ADD PRIMARY KEY (`photo_id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `reviewer_id` (`reviewer_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `renter_id` (`renter_id`);

--
-- Indexes for table `userdocuments`
--
ALTER TABLE `userdocuments`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `property_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `propertydocuments`
--
ALTER TABLE `propertydocuments`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `propertyphotos`
--
ALTER TABLE `propertyphotos`
  MODIFY `photo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userdocuments`
--
ALTER TABLE `userdocuments`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `featured_properties`
--
ALTER TABLE `featured_properties`
  ADD CONSTRAINT `featured_properties_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`);

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `propertydocuments`
--
ALTER TABLE `propertydocuments`
  ADD CONSTRAINT `propertydocuments_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`);

--
-- Constraints for table `propertyphotos`
--
ALTER TABLE `propertyphotos`
  ADD CONSTRAINT `propertyphotos_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`renter_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `userdocuments`
--
ALTER TABLE `userdocuments`
  ADD CONSTRAINT `userdocuments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

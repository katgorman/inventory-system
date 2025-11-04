DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;
USE inventory_db;



CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0.00,
  category VARCHAR(100)
);


-- Sample data
INSERT INTO items (name, description, quantity, price, category) VALUES
('Wireless Mouse','Logitech M185', 25, 14.99, 'Electronics'),
('Desk Lamp','LED desk lamp', 12, 22.50, 'Office'),
('Coffee Maker','Single serve', 5, 49.99, 'Kitchen');
# Inventory System

---

## Team
Kat, Sasha, Julie, and Noah

---

## Tools 
- **Node.js** – Server runtime  
- **Express.js** – Backend framework for routing and APIs  
- **MySQL** – Relational database for persistent storage  

---

## Overview
This project is a simple **Inventory Management System** that connects a **Node.js + Express** backend to a **MySQL** database.  
It demonstrates full CRUD operations (Create, Read, Update, Delete) and basic relational database design.

Each item record includes:
- ID (auto-incremented primary key)
- Name  
- Description  
- Quantity  
- Price  
- Category  

---

## Setup Instructions

### 1. Clone and install
```bash
git clone https://github.com/katgorman/inventory-system.git
cd inventory-system
npm install
```
### 2. Database Setup
In your MySQL console or Workbench:

```sql
CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0.00,
  category VARCHAR(100)
);
```
### 3. Configure DB Connection
```js
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',      // your MySQL password here
  database: 'inventory_db',
});
```

### 4. Run the Server
```bash
node server.js
```



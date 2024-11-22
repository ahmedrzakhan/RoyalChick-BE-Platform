// src/config/init-db.js
const { pool } = require('./database');

async function initializeDatabase() {
  let connection;
  try {
    connection = await pool.getConnection();
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX email_index (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    //create restaurants table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS resturants (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        address_line1 VARCHAR(100) NOT NULL,
        address_line2 VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        post_code VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(100) NOT NULL,
        opening_hours VARCHAR(100) NOT NULL,
        closing_hours VARCHAR(100) NOT NULL,
        seating_capacity int NOT NULL,
        status ENUM('ACTIVE', 'CLOSED', 'RENOVATING') DEFAULT 'ACTIVE',
        manager_id int,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (manager_id) REFERENCES users(id),
        INDEX post_code_index (post_code),
        INDEX city_index(city)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
    //create orders table
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        customer_id int,
        resturant_id int,
        order_type VARCHAR(20),
     	  status VARCHAR(20),
        total_amount DOUBLE,
        payment_status VARCHAR(12),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES users(id),
        FOREIGN KEY (resturant_id) REFERENCES resturants(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
    // create order_items table
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id int,
        item_id int,
        quantity int,
        unit_price DOUBLE,
        total_price DOUBLE,
        special_instruction VARCHAR(100),
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (item_id) REFERENCES menu_items(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
    // create menu_items table
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS menu_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        description VARCHAR(120),
        price DOUBLE,
        image VARCHAR(120),
        preparation_time TIMESTAMP,
        calories DOUBLE,
        allergens VARCHAR(100),
        status ENUM('AVAILABLE', 'UNAVAILABLE'),
        is_featured BOOLEAN,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
    //create employees table
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS employees (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        password VARCHAR(100),
        resturant_id int,
        position ENUM('STAFF','MANAGER', 'KITCHEN_STAFF', 'EXECUTIVE') DEFAULT 'STAFF',
        hire_date TIMESTAMP,
        salary DOUBLE,
        status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { initializeDatabase };

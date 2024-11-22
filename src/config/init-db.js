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

    await connection.execute(`CREATE TABLE IF NOT EXISTS central_kitchen (
          kitchen_id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(100) NOT NULL,
          address VARCHAR(255) NOT NULL,
          city VARCHAR(100) NOT NULL,
          postcode VARCHAR(20) NOT NULL,
          phone VARCHAR(15) NOT NULL,
          manager_id INT,
          status ENUM('ACTIVE', 'INACTIVE', 'RENOVATING') DEFAULT 'ACTIVE',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (manager_id) REFERENCES users(id),
          INDEX city_index (city),
          INDEX postcode_index (postcode)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

    //create restaurants table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS restaurants (
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

    // create menu_items table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS menu_items (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(120),
      price DOUBLE NOT NULL,
      image VARCHAR(120),
      preparation_time TIMESTAMP,
      calories DOUBLE,
      allergens VARCHAR(100),
      status ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
      is_featured BOOLEAN,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX status_index (status),
      INDEX featured_index (is_featured)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    //create orders table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
      id INT PRIMARY KEY AUTO_INCREMENT,
      customer_id int NOT NULL,
      restaurant_id int NOT NULL,
      status ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED') NOT NULL,
      total_amount DOUBLE NOT NULL DEFAULT 0,
      payment_status VARCHAR(12),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES users(id),
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
      INDEX order_status_date (status, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // create order_items table
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id int NOT NULL,
        item_id int NOT NULL,
        quantity int NOT NULL,
        unit_price DOUBLE NOT NULL,
        total_price DOUBLE NOT NULL,
        special_instruction VARCHAR(100),
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (item_id) REFERENCES menu_items(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

    //create employees table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS employees (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      restaurant_id int,
      position ENUM('STAFF','MANAGER', 'KITCHEN_STAFF', 'EXECUTIVE') DEFAULT 'STAFF',
      hire_date TIMESTAMP,
      salary DOUBLE,
      status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
      email VARCHAR(100) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

    // Analytics tracking for executive insights
    await connection.execute(`CREATE TABLE IF NOT EXISTS revenue_analytics (
      id INT PRIMARY KEY AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      date DATE NOT NULL,
      daily_revenue DECIMAL(10,2),
      total_orders INT,
      average_order_value DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
      INDEX date_index (date),
      INDEX restaurant_date_index (restaurant_id, date)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

    // Staff scheduling
    await connection.execute(`CREATE TABLE IF NOT EXISTS staff_schedules (
      id INT PRIMARY KEY AUTO_INCREMENT,
      employee_id INT NOT NULL,
      restaurant_id INT NOT NULL,
      shift_date DATE NOT NULL,
      shift_start TIME NOT NULL,
      shift_end TIME NOT NULL,
      status ENUM('SCHEDULED', 'COMPLETED', 'ABSENT', 'ON_LEAVE'),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (employee_id) REFERENCES employees(id),
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
      INDEX schedule_date_index (restaurant_id, shift_date)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

    // Supplier management
    await connection.execute(`CREATE TABLE IF NOT EXISTS suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address TEXT,
    payment_terms VARCHAR(100),
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

    // Kitchen performance metrics
    await connection.execute(`CREATE TABLE IF NOT EXISTS kitchen_metrics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    date DATE NOT NULL,
    avg_preparation_time INT, -- in minutes
    total_orders_completed INT,
    total_orders_delayed INT,
    waste_amount DECIMAL(10,2), -- in monetary value
    inventory_level_end_day JSON, -- store as {"item_id": quantity}
    staff_attendance JSON, -- store as {"staff_id": hours_worked}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    INDEX kitchen_date_index (restaurant_id, date),
    INDEX date_metrics (date, avg_preparation_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

    // Create inventory table (should be after restaurants and menu_items)
    await connection.execute(`CREATE TABLE IF NOT EXISTS inventory (
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    last_restocked TIMESTAMP,
    unit_of_measure VARCHAR(20) NOT NULL,
    minimum_threshold DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (item_id) REFERENCES menu_items(id),
    INDEX restaurant_index (restaurant_id),
    INDEX item_index (item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

    // Create inventory_transactions table
    await connection.execute(`CREATE TABLE IF NOT EXISTS inventory_transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    inventory_id INT NOT NULL,
    kitchen_id INT,
    type ENUM('RESTOCK', 'USAGE', 'WASTE', 'TRANSFER') NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recorded_by INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id),
    FOREIGN KEY (kitchen_id) REFERENCES central_kitchen(kitchen_id),
    FOREIGN KEY (recorded_by) REFERENCES users(id),
    INDEX transaction_date_index (transaction_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

    // Create shifts table first (needed for attendance)
    await connection.execute(`CREATE TABLE IF NOT EXISTS shifts (
    shift_id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    shift_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

    // Create attendance table (should be after employees and shifts)
    await connection.execute(`CREATE TABLE IF NOT EXISTS attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    shift_id INT NOT NULL,
    clock_in TIMESTAMP,
    clock_out TIMESTAMP,
    hours_worked DECIMAL(5,2),
    status ENUM('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY') DEFAULT 'PRESENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (shift_id) REFERENCES shifts(shift_id),
    INDEX employee_index (employee_id),
    INDEX shift_index (shift_id)
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

CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- ผู้ใช้
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    status TEXT NOT NULL
    profile_image TEXT ,
    birthday 
    phone number TEXT ,
    first_name TEXT
    last_name TEXT,
);

-- ที่อยู่สำหรับจัดส่ง
-- CREATE TABLE addresses (
--     id SERIAL PRIMARY KEY,
--     user_id UUID REFERENCES users(id),
--     line1 TEXT NOT NULL,
--     city TEXT NOT NULL,
--     postal_code TEXT NOT NULL,
--     country TEXT NOT NULL
-- );

-- หมวดหมู่สินค้า
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- สินค้า
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category_id INT REFERENCES categories(id),
    price NUMERIC(12,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
    image_name TEXT NOT NULL 
);

-- ตะกร้าสินค้า
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id)
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL
);

-- คำสั่งซื้อ
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    status TEXT NOT NULL,                -- pending / paid / shipped / delivered
    total_amount NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
);

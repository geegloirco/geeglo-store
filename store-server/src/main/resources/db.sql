DROP DATABASE IF EXISTS geeglo_store;
CREATE DATABASE geeglo_store;
ALTER DATABASE geeglo_store CHARACTER SET utf8 COLLATE utf8_general_ci;
use geeglo_store;

DROP TABLE IF EXISTS country;
create table country (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128),
  phoneCode VARCHAR(10)
);
ALTER TABLE country CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS province;
create table province (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  country_id INT,
  title VARCHAR(128),
  CONSTRAINT fk_province_country FOREIGN KEY (country_id) REFERENCES country (id)
);
ALTER TABLE province CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS city;
create table city (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  country_id INT,
  province_id INT,
  title VARCHAR(128),
  phoneCode VARCHAR(10),
  CONSTRAINT fk_city_country FOREIGN KEY (country_id) REFERENCES country (id),
  CONSTRAINT fk_city_province FOREIGN KEY (province_id) REFERENCES province (id)
);
ALTER TABLE city CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

-- create table location (
--   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   country_id INT NOT NULL,
--   province_id INT NOT NULL,
--   city_id INT NOT NULL,
--   title VARCHAR(60) NOT NULL,
--   latitude DOUBLE,
--   longitude DOUBLE,
--   address VARCHAR(255),
--   phone_number VARCHAR(8),
--   post_code VARCHAR(10),
--   CONSTRAINT fk_location_country FOREIGN KEY (country_id) REFERENCES country (id),
--   CONSTRAINT fk_location_province FOREIGN KEY (province_id) REFERENCES province (id),
--   CONSTRAINT fk_location_city FOREIGN KEY (city_id) REFERENCES city (id)
-- );
-- ALTER TABLE location CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS user;
create table user (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(128),
  gmail VARCHAR(128),
  mobile VARCHAR(11),
  password VARCHAR(128),
  image VARCHAR(128),
  enter_date timestamp NOT NULL,
  CONSTRAINT uk_user_gmail UNIQUE KEY(gmail),
  CONSTRAINT uk_user_mobile UNIQUE KEY(mobile)
);
ALTER TABLE user CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS user_info;
create table user_info (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  full_name VARCHAR(80),
  national_code VARCHAR(10),
  birthdate CHAR(10),
  age INT,
  CONSTRAINT fk_user_info_user FOREIGN KEY (user_id) REFERENCES user (id)
);
ALTER TABLE user_info CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS address;
create table address (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(60) NOT NULL,
  latitude DOUBLE,
  longitude DOUBLE,
  detail VARCHAR(255),
  phone_number VARCHAR(8),
  post_code VARCHAR(10),
  CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES user (id)
);
ALTER TABLE address CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

-- create table user_location (
--   user_id INT NOT NULL,
--   location_id INT NOT NULL,
--   CONSTRAINT fk_user_location_user FOREIGN KEY (user_id) REFERENCES user (id),
--   CONSTRAINT fk_user_location_location FOREIGN KEY (location_id) REFERENCES location (id)
-- );
-- ALTER TABLE user_location CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS payment_type;
create table payment_type (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,
  image VARCHAR(128),
  is_activate BOOLEAN DEFAULT TRUE
);
ALTER TABLE payment_type CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS item_group;
create table item_group (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,
  icon VARCHAR(128),
  image VARCHAR(128)
);
ALTER TABLE item_group CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

create table item (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  item_group_id INT NOT NULL,
  title VARCHAR(128) NOT NULL,
  price INT DEFAULT 0,
  count INT DEFAULT 0,
  unit VARCHAR(128),
  image VARCHAR(128),
  CONSTRAINT fk_item_item_group FOREIGN KEY (item_group_id) REFERENCES item_group (id)
);
ALTER TABLE item CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS delivery_status;
CREATE TABLE delivery_status (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(60),
  image VARCHAR(128)
);
ALTER TABLE delivery_status CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS cart_detail;
DROP TABLE IF EXISTS cart;
create table cart (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  delivery_status_id INT NOT NULL,
  payment_type_id INT NOT NULL,
  reference_no CHAR(10) NOT NULL,
  creation_time TIMESTAMP,
  register_time TIMESTAMP,
  delivery_time TIMESTAMP,
  total_price INT,
  register_date CHAR(10),
  delivery_date CHAR(10),
  address_title VARCHAR(60),
  payment_type_title VARCHAR(60),
  is_paid BOOLEAN DEFAULT FALSE,
  is_received BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES user (id)
);
ALTER TABLE cart CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS cart_detail;
create table cart_detail (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cart_id INT NOT NULL,
  reference_no CHAR(10) NOT NULL,
  history TEXT,
  CONSTRAINT fk_cart_detail_cart FOREIGN KEY (cart_id) REFERENCES cart (id)
);
ALTER TABLE cart_detail CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS open_cart;
create table open_cart (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  creation_time TIMESTAMP,
  items TEXT
);
ALTER TABLE open_cart CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO country (title, phoneCode) VALUES ('ایران', '+98');

INSERT INTO province (country_id, title) VALUES (1, 'تهران');

INSERT INTO city (country_id, province_id, title, phoneCode) VALUES (1, 1, 'تهران', '21');

INSERT INTO item_group (title, image) VALUES
('سبزیجات', 'vegetable.png'),
('مرکبات', 'lemon.png'),
('میوه', 'fruit.png'),
('صیفی جات', 'carrot.png'),
('استوایی', 'ananas.png');

INSERT INTO item (item_group_id, title, price, unit, image) VALUES
(1, 'کالای 1', 3000, 'کیلوگرم', 'goods.png'),
(1, 'کالای 2', 7000, 'لیتر', 'goods.png'),
(1, 'کالای 3', 3800, 'عدد', 'goods.png'),
(1, 'کالای 4', 4000, 'نیم کیلو', 'goods.png'),
(1, 'کالای 5', 15000, 'جین', 'goods.png');

INSERT INTO item (item_group_id, title, price, unit, image) VALUES
(2, 'کالای 1', 3000, 'کیلوگرم', 'goods.png'),
(2, 'کالای 5', 15000, 'جین', 'goods.png');

INSERT INTO item (item_group_id, title, price, unit, image) VALUES
(3, 'کالای 1', 3000, 'کیلوگرم', 'goods.png'),
(3, 'کالای 5', 15000, 'جین', 'goods.png'),
(3, 'کالای 4', 4000, 'نیم کیلو', 'goods.png');

INSERT INTO payment_type (title, image, is_activate) VALUES
('پرداخت اینترنتی', 'internet.png', false),
('پرداخت نقدی', 'cash.png', true),
('پرداخت با کارت خوان', 'pos.png', true);

INSERT INTO delivery_status (title, image) VALUES
('در حال بررسی', 'pending.png'),
('تایید شده', 'confirm.png'),
('در حال تامین', 'supplying.png'),
('آماده ارسال', 'ready-to-send.png'),
('در راه مقصد', 'on-way.png'),
('تحویل شده', 'delivered.png'),
('عدم حضور خریدار', 'absence.png');

INSERT INTO country (title, phoneCode) VALUES ('iran', '+98');

INSERT INTO province (country_id, title) VALUES (1, 'tehran');

INSERT INTO city (country_id, province_id, title, phoneCode) VALUES (1, 1, 'tehran', '21');

INSERT INTO item_group (title, image) VALUES
('Vegetables', 'vegetable.png'),
('Citrus', 'lemon.png'),
('Fruit', 'fruit.png'),
('Siffy', 'carrot.png'),
('Tropical', 'ananas.png');

INSERT INTO item (item_group_id, title, price, unit, image) VALUES
(1, 'goods 1', 3000, 'kg', 'goods.png'),
(1, 'goods 2', 7000, 'lit', 'goods.png'),
(1, 'goods 3', 3800, 'count', 'goods.png'),
(1, 'goods 4', 4000, 'kg', 'goods.png'),
(1, 'goods 5', 15000, 'jin', 'goods.png');

INSERT INTO item (item_group_id, title, price, unit, image) VALUES
(2, 'goods 6', 3000, 'kg', 'goods.png'),
(2, 'goods 7', 15000, 'jin', 'goods.png');

INSERT INTO item (item_group_id, title, price, unit, image) VALUES
(3, 'goods 8', 3000, 'kg', 'goods.png'),
(3, 'goods 9', 15000, 'jin', 'goods.png'),
(3, 'goods 10', 4000, 'lit', 'goods.png');

INSERT INTO payment_type (title, image, is_activate) VALUES
('internet', 'internet.png', false),
('cash', 'cash.png', true),
('pos', 'pos.png', true);

INSERT INTO delivery_status (title, image) VALUES
('pending', 'pending.png'),
('confirm', 'confirm.png'),
('supplying', 'supplying.png'),
('ready', 'ready-to-send.png'),
('onway', 'on-way.png'),
('delivered', 'delivered.png'),
('absence', 'absence.png');
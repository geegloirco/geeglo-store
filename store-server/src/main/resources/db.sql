DROP DATABASE geeglo_store;
CREATE DATABASE geeglo_store;
ALTER DATABASE geeglo_store CHARACTER SET utf8 COLLATE utf8_general_ci;
use geeglo_store;

create table country (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128),
  phoneCode VARCHAR(10)
);
ALTER TABLE country CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

create table province (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  country_id INT,
  title VARCHAR(128),
  CONSTRAINT fk_province_country FOREIGN KEY (country_id) REFERENCES country (id)
);
ALTER TABLE province CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

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

create table cart (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  creation_time TIMESTAMP,
  items TEXT,
  register_time TIMESTAMP,
  is_paid BOOLEAN DEFAULT FALSE,
  is_recieved BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES user (id)
);
ALTER TABLE cart CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

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

select * from item_group;

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
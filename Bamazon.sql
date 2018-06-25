DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  itemId INTEGER AUTO_INCREMENT NOT NULL,
  productName VARCHAR(500) NOT NULL,
  departmentName VARCHAR(200) NOT NULL,
  price DECIMAL(10,4) NOT NULL,
  stockQuantity INTEGER ,
  PRIMARY KEY (itemId)
);


INSERT INTO products (productName,departmentName,price,stockQuantity) 
VALUES ('Echo Dot-Black','Electronics',29.99,2),
       ('Home Office Corner DeskTop Wood-Walnut','Home & Kitchen',79.87,5),
       ('Fitbit Flex-Black','Electronics',54.99,3),
       ('Transformers Rescue Bots Optimus Prime Figure','Kids-Toys',14.99,15),
       ('SkikHop Zoo Insulated Toddler Backpack Eureka Unicorn','Kids-accesories',15.49,6),
       ('Hamilton Beach Food Processor & Vegetable Chopper','Home & Kitchen',37.24,2),
       ('Corningware Bakeware','Home & Kitchen',34.99,2),
       ('Storage Bins','Home & Kitchen',14.99,20),
       ('Sony Headset','Electronics',45.79,25),
       ('Contigo Flask','Home & Kitchen',22.99,12);

SELECT * FROM products;

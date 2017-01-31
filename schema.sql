CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT primary key,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(11),
    stock_quantity(11)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Baseball", "Sports", 5, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Football", "Sports", 10, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Hockey Stick", "Sports", 25, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("NHL 17 (PS4)", "Video Games", 60, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("NHL 17 (Xbox One)", "Video Games", 60, 31);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Fallout 4 (PC)", "Video Games", 30, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("New York Mets Jersey", "Apparel", 120, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Adidas Track Suit", "Apparel", 40, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Under Armor Shorts", "Apparel", 20, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("CoolerMaster Pro Keys S", "Mechanical Keyboards", 110, 43);
# Bamazon-Node.js-MySQL

Description:
This is a Command line operated application for a Store(Bamazon), from which 
-- Customers can purchase items from a given list.
-- Managers can check and update the stocks.

Technologies used:
JavaScript
MySQL
Node.js

Database Setup-
To run this application MySQL has to be installed.Then you can run Bamazon.sql file with the data created.Use MySQL workbench or SequelPRO to view the database.Then proceed to run the application in command line/Terminal.

Costumer Interface-
Here the user can view from database, the product details like Id, product Name , Department to which the product belongs, price of product and  current stock details.

To run the application use following commands:
open MySQL server: MySQL -u root
Connect to database file: source `name of sql file`
Start the node server: node `name of javascript file`

There will be prompt questions for user to use the application.

Manager Interface-
The manager interface presents a list of four options, as below.

 Please select an option: 
❯ View Products for Sale 
  View Low Inventory 
  Add to Inventory 
  Add New Product
The View Products for Sale option allows the manager to view the product details like:  Id, product Name , Department to which the product belongs, price of product and  current stock details.


The View Low Inventory option shows the Manager/user the items which currently have fewer than 5 units available.

The Add to Inventory option allows the Manager/user to select a given item ID and add additional inventory to the target item.

The Add New Product option allows the Manger/user to enter details about a new product which will be entered into the database upon completion of the form.

Here's link to watch the demo of Bamazon App.
https://drive.google.com/file/d/1nrvfaDv07gEh_0JbCu86xnrIbEpXWBzI/view?usp=sharing




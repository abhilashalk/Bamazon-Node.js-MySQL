var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("-----------------------------------");
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        //for loop through the table to display list to user
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].itemId + " | " + res[i].productName + " | " + "$" + res[i].price + " | " + res[i].stockQuantity + " | ");
        }
        console.log("-----------------------------------");


        // Prompt the user to select an item
        inquirer
            .prompt([{
                name: "idInput",
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }, {
                name: "numberUnits",
                type: "input",
                message: "What is the quantity of units you would like to buy?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                }

            }])


            .then(function (answer) {
                // Storing user inputs/answer into variables
                var productID = (answer.idInput) - 1;
                var numberOfUnits = parseInt(answer.numberUnits);
                // calculate total for user - price*quantity
                var total = parseFloat((res[productID].price) * numberOfUnits);

                // checking the stockQuantity to the number of units given by user
                if (res[productID].stockQuantity >= numberOfUnits) {

                    // Updating stock after user buys item
                    connection.query('UPDATE products SET ? WHERE ?', [{
                            stockQuantity: (res[productID].stockQuantity - numberOfUnits)
                        },
                        {
                            itemId: answer.idInput
                        }
                    ], function (err, res) {

                        if (err) throw err;
                        console.log('\n-------------------------------------');
                        console.log("\nYour order has been placed and will be delivered in 4-5 business days. ");
                        console.log("\nYour total is $" + total.toFixed(2));
                        console.log("\nThanks for shopping with us!");
                        console.log('-------------------------------------');
                        // start();
                    });

                } else {
                    console.log('\n-------------------------------------');
                    console.log("Sorry, there is not enough units in stock!");
                    console.log('\n-------------------------------------');

                }
                start();
            });

    })
}
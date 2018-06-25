var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "bamazonDB"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
})




function start() {
    connection.query('SELECT * FROM products', function (err, res) {
        //prompt manager from choices array
        inquirer.prompt({
                name: "action",
                type: "rawlist",
                message: "What would you like to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ]
            })
            // switch between choices
            .then(function (answer) {
                switch (answer.action) {
                    case 'View Products for Sale':
                        displayProducts();
                        break;

                    case 'View Low Inventory':
                        displayLowInventory();
                        break;

                    case 'Add to Inventory':
                        addToInventory();
                        break;

                    case 'Add New Product':
                        addNewProduct();
                        break;
                }
            })


        function displayProducts() {

            console.log("----------------------------");
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].itemId + " | " + res[i].productName + " | " + "$" + res[i].price + " | " + res[i].stockQuantity + " | ");
            }
            console.log("----------------------------");
            start();
        }

        function displayLowInventory() {
            console.log("----------------------------");
            for (var i = 0; i < res.length; i++) {
                if (res[i].stockQuantity <= 5) {
                    console.log(res[i].itemId + " | " + res[i].productName + " | " + "$" + res[i].price + " | " + res[i].stockQuantity + " | ");
                    console.log("----------------------------");
                }
            }

            start();
        }


        function addToInventory() {
            console.log('\n-------------------------------------');
            inquirer.prompt([{
                name: "idInput",
                type: "input",
                message: "What is the ID of the product you would like to update?",
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
                message: "What is the quantity of units you would like to add?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }

                }
            }]).then(function (answer) {
                var productID = (answer.idInput) - 1;
                var numberOfUnits = parseInt(answer.numberUnits);

                connection.query('UPDATE products SET ? WHERE ?', [{
                            stockQuantity: (res[productID].stockQuantity + numberOfUnits)
                        },
                        {
                            itemId: answer.itemId
                        }

                    ],

                    function (err, res) {
                        if (err) throw err;
                    });

                for (var i = 0; i < res.length; i++) {

                    if (res[i].itemId == answer.idInput) {
                        console.log("----------------------------");
                        console.log('You now have ' + numberOfUnits + ' more ' + res[i].productName + ' units');
                        console.log("----------------------------");
                    }
                }
                start();
            })


        }

        function addNewProduct() {
            inquirer.prompt([{
                    name: "newProduct",
                    type: "input",
                    message: "What is the name of the product you would like to add?"
                },
                {
                    name: "deptName",
                    type: "input",
                    message: "What department would you like to add the product to?"
                },
                {
                    name: "prodPrice",
                    type: "input",
                    message: "What is the price of the product?",
                    validate: function (value) {
                        if (isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }

                    }
                },
                {
                    name: "numAdd",
                    type: "input",
                    message: "How many units would you like to add?",
                    validate: function (value) {
                        if (isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }

                    }
                }
            ]).then(function (answer) {
                connection.query('INSERT INTO products SET ?', {
                    productName: answer.newProduct,
                    departmentName: answer.deptName,
                    price: answer.prodPrice,
                    stockQuantity: answer.numAdd
                }, function (err, res) {
                    if (err) throw err;
                    console.log("-------------------------");
                    console.log("You have just added " + answer.numAdd + " " + answer.newProduct + " units at $" + answer.prodPrice + " each.")
                    console.log("-------------------------");
                    start();
                });

            })

        }

    });

} // end of function start()
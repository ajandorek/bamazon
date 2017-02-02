//declaring our variables
var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");
var Table = require('cli-table');

//creating a connection to our SQL database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "MyNewPass",
    database: "bamazon"
});

//Creating a new commandline table for aesthetics
var table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

//Creating a list for manager view options
var managerView = function(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Please choose what you would like to do",
            choices: ['View Products For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product']
        }
    ]).then(function(response){
        
        //the following If statements are based on what the user chooses
        //this option shows the manager all available products
        if (response.choice === 'View Products For Sale'){
            connection.query(`SELECT * FROM products`, function(err, res){
                if (err) throw err;
                
                table.push(
                    ['Item ID', 'Item Description', 'Price']
                );
                //creating a table of all available products
                for (var i = 0; i < res.length; i++){
                    table.push(
                        [res[i].item_id, res[i].product_name, res[i].price]
                    );
                    quanity = res[i].stock_quantity
                };
                console.log(table.toString());
            });
        //This statement shows the manager all products with low inventory
        } else if (response.choice === 'View Low Inventory'){
            connection.query(`SELECT * FROM products`, function(err, res){
                if (err) throw err;
                table.push(
                    ['Item ID', 'Item Description', 'Quantity']
                );
                for (var i = 0; i < res.length; i++){
                    if (res[i].stock_quantity <= 5){
                    table.push(
                        [res[i].item_id, res[i].product_name, colors.red(res[i].stock_quantity)]
                    );
                    }       
                }
            console.log(table.toString());
            });

        //This statement allows the manager to adjust inventory levels
        } else if (response.choice === 'Add To Inventory'){
            connection.query(`SELECT * FROM products`, function(err, res){
                if (err) throw err;
                    table.push(
                            ['Item ID', 'Item Description', 'Quantity']
                        );
                        for (var i = 0; i < res.length; i++){
                            table.push(
                                [res[i].item_id, res[i].product_name, res[i].stock_quantity]
                            );
                            }       
                    console.log(table.toString());
            var addInventory = function() {
                inquirer.prompt([
                    {
                        type: "prompt",
                        name: "item",
                        message: "Please choose the item you'd like to adjust inventory for"
                    }, {
                        type: "prompt",
                        name: "quantity",
                        message: "Please enter the updated inventory"
                    }
                ]).then(function(response){
                    var item = response.item;
                    connection.query('UPDATE products SET ? WHERE ?',
                    [
                        {stock_quantity: response.quantity},
                        {item_id: item}
                    ],
                    function (err, res){});
                    console.log("Inventory Update Successful!");
                });
            }
            addInventory();
            });

        //This statement allows the creation of a new Product
        } else if (response.choice === 'Add New Product'){
            var addItem = function() {
                inquirer.prompt([
                    {
                        type: "prompt",
                        name: "name",
                        message: "Please enter the product name: "
                    }, {
                        type: "prompt",
                        name: "dept",
                        message: "Please enter the department name: "
                    }, {
                        type: "prompt",
                        name: "price",
                        message: "Please enter the price: "
                    }, {
                        type: "prompt",
                        name: "quantity",
                        message: "Please enter the quantity: "
                    }
                ]).then(function(response){
                    connection.query('INSERT INTO products SET ?', {
                        product_name: response.name,
                        department_name: response.dept,
                        price: response.price,
                        stock_quantity: response.quantity
                    }, function(err, res) {});
                    console.log("Item successfully added!");
                });
            }
        addItem();
        }
    });
};
//Running our managerView function
managerView();
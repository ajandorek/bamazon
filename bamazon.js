//declaring our variables
var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");
var Table = require('cli-table');

//Creating our SQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "MyNewPass",
    database: "bamazon"
});

//Creating a table for aesthetics
var table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

console.log("Welcome to Bamazon!".bgRed.bold);

//declaring quantity and price variables
var quanity;
var price;
connection.query(`SELECT * FROM products`, function(err, res){
    if (err) throw err;
    
    table.push(
        ['Item ID', 'Item Description', 'Price']
    );

    for (var i = 0; i < res.length; i++){
        table.push(
            [res[i].item_id, res[i].product_name, res[i].price]
        );
        quanity = res[i].stock_quantity
    };
    console.log(table.toString());
    
    //Creating our client view
    var clientView = function() {
        inquirer.prompt([
            {
                type: "prompt",
                name: "item_id",
                message: "Please enter a product ID:"
            }, {
                type: "prompt",
                name: "quantity",
                message: "Please enter the quantity:"
            }
        ]).then(function(response){
            //setting our item variable equal to the item id
            var item = response.item_id;
            //if the requested quantity is less than the amount available the order will go through
            if(response.quantity < res[item - 1].stock_quantity){
                console.log(`Purchase of ${res[item - 1].product_name} successful!`)
                console.log('Total: $' + (res[item - 1].price * response.quantity));
                connection.query('UPDATE products SET ? WHERE ?',
                        [
                            {stock_quantity: res[item - 1].stock_quantity - response.quantity},
                            {item_id: res[item - 1].item_id}
                        ],
                        function (err, res) {});
            //if the requested amount is greater than the available stock then the order will not go through            
            } else {
                console.log("Insufficient Quantity Available");
            }
        });
    }
clientView();
});
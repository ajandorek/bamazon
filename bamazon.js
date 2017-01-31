var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");
var ui = require("cliui")({
    width: 60
});

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "MyNewPass",
    database: "bamazon"
});

console.log("Welcome to Bamazon!".bgRed.bold);

connection.query(`SELECT * FROM products`, function(err, res){
    if (err) throw err;
    ui.div(
            'Item ID \t Item Description \t Price \n'
    );
    for (var i = 0; i < res.length; i++){
    ui.div(
            res[i].item_id + '        \t' + res[i].product_name + '         \t' + res[i].price + '\n' 
    );
    };
    console.log(ui.toString());
});
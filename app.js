// ==== Dependencies ====
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startPrompt();
});

function startPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Main Menu",
            name: "choice",
            choices: [
                "View all employee",
                "View all employee by Departments",
                "View all employees by Roles",
                "Add an employee",
                "Add a role",
                "Add a department",
                "Update employee roles"
            ]
        }
        
    ])
    .then((answer) => {
        
    })
}
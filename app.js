// ================ Dependencies ================
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

// ================ Starting Prompt ================
const startPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Main Menu",
            name: "choice",
            choices: [
                "View all employees by name",
                "View all employees by roles",
                "View all employees by departments",
                // "View all employees by manager",
                "Add an employee",
                "Add a role",
                "Add a department",
                "Update employee roles",
                // "Update employee manager",
                // "Delete an employee",
                // "Delete a role",
                // "Delete a department"
            ]
        }
    ])
    .then((answer) => {
        switch (answer.choice) {
            case "View all employees by name":
                viewEmployees();
                break;
            case "View all employees by roles":
                viewRoles();
                break;
            case "View all employees by departments":
                viewDepartments();
                break;
            // case "View all employees by manager":
            //     viewManager();
            //     break;    
            case "Add an employee":
                addEmployee();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add a department":
                addDepartment();
                break;
            // case "Update employee roles":
            //     updateEmployeeRoles();
            //     break;
            // case "Update employee manager":
            //     updateManager();
            //     break;
            // case "Delete an employee":
            //     deleteEmployee();
            //     break; 
            // case "Delete a role":
            //     deleteRole();
            //     break;
            // case "Delete a department":
            //     deleteDepartment();
            //     break;
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

// ================ Functions ================
const viewEmployees = () => {
    connection.query("SELECT * FROM employee;",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    })
}
const viewRoles = () => {
    connection.query("SELECT * FROM roles;",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    })
}
const viewDepartments = () => {
    connection.query("SELECT * FROM department;",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    })
}
// const viewManager = () => {}   

const addEmployee = () => {}
const addDepartment = () => {}

// const updateEmployeeRoles = () => {}
// const updateManager = () => {}

// const deleteEmployee = () => {}
// const deleteRole = () => {}
// const deleteDepartment = () => {}

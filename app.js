// ================ Dependencies ================
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");


// ================ Connection ================
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

// ================ Global Variables ================
var roleList = [];
var managerList = [];
var employeeList = [];

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
                // "Delete a department",
                "EXIT"
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
            case "Update employee roles":
                updateEmployeeRoles();
                break;
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
            case "EXIT":
                process.exit();
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

// ================ Functions ================
const viewEmployees = () => {
    connection.query("SELECT * FROM employee",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    })
}
const viewRoles = () => {
    connection.query("SELECT * FROM roles",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    })
}
const viewDepartments = () => {
    connection.query("SELECT * FROM department",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    })
}
// const viewManager = () => {}   

const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
            validate: validInput
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
            validate: validInput
        },
        {
            name: "selectRole",
            type: "rawlist",
            message: "What is the employee's role?",
            choices: selectRole()
        },
        {
            name: "selectManager",
            type: "rawlist",
            message: "What is the employee's manager name?",
            choices: selectManager()
        }
    ])
    .then(function(answer) {
        const roleID = selectRole().indexOf(answer.selectRole) + 1;
        const managerID = selectManager().indexOf(answer.selectManager) + 1;
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: roleID, // Not working
            manager_id: managerID // Not working
        },
        function (err) {
            if (err) throw err
            console.table(answer);
            startPrompt();
        })
    })
};
const addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the role?",
            validate: validInput
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?",
            validate: validInput
        },
        {
            name: "deptID",
            type: "input",
            message: "What is the department ID?",
            validate: validInput
        },
    ])
    .then(function(answer) {
        connection.query("INSERT INTO roles SET ?",
        {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.deptID
        },
        function (err) {
            if (err) throw err
            console.table(answer);
            startPrompt();
        })
    })
}
const addDepartment = () => {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the department name",
            validate: validInput
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO department SET ?",
        {
            name_dept: answer.deptName
        },
        function (err) {
            if (err) throw err
            console.table(answer);
            startPrompt();
        })
    })
}

const updateEmployeeRoles = () => {
    let employeeArray = [];
    let roleArray = [];
    connection.query("SELECT * FROM employee;", function(err, res) {
        if(err) throw err;
        inquirer.prompt([
            {
                name: "lastName",
                type: "list",
                choices: selectEmployee(),
                message: "Which employee's role are you changing?"
            },
            {
                name: "roles",
                type: "rawlist",
                choices: selectRole(),
                message: "Which roles would you like to change?"
            }
        ])
        .then(function(answer) {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
            {
                last_name: answer.lastName
            },
            )

        })
    })
}
// const updateManager = () => {}

// const deleteEmployee = () => {}
// const deleteRole = () => {}
// const deleteDepartment = () => {}

// ================ Function Arrays ================
const selectRole = () => {
    connection.query("SELECT * FROM roles", function (err, res){
        if (err) throw err;
        roleList = [];
        for (var i = 0; i < res.length; i++){
            roleList.push(res[i].title);
        }
    })
    return roleList;
};

const selectManager = () => {
    connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, res){
        if (err) throw err;
        managerList = [];
        for (var i = 0; i < res.length; i++){
            managerList.push(res[i].first_name);
        }
    })
    return managerList;
};

const selectEmployee = () => {
    connection.query("SELECT * FROM employee", function (err, res){
        if (err) throw err;
        employeeList = [];
        for (var i = 0; i < res.length; i++){
            employeeList.push(res[i].last_name);
        }
    })
    return employeeList;
};
// var deptNum = [];
// const deptNumFunc = () => {
//     connection.query("SELECT * FROM department", function(err, res){

//     }) 
// }

// ================ Validation Functions ================
const validInput = (input, type) => {
    if (input.length < 1) {
        return console.log(`Please provide a valid input.`);
    }
    return true;
}

selectRole();
selectManager();
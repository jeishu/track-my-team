DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name_dept VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    is_manager BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
	FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name_dept)
VALUES 
("IT"), -- 1
("Sales"), -- 2
("HR"), -- 3
("Marketing"); -- 4

INSERT INTO roles (title, salary, department_id)
VALUES 
("IT Manager", 90000.00, 1),
("Sales Manager", 80000.00, 2),
("HR Manager", 70000.00, 3),
("Marketing Manager", 70000.00, 4),
("Software Engineer", 90000.00, 1),
("Sales Consultant", 45000.00, 2),
("HR Specialist", 60000.00, 3),
("Market Research Analyst", 65000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id, is_manager)
VALUES 
("Jay", "Zhang", 1, NULL , TRUE),
("Jae", "Zhong", 2, NULL , TRUE),
("Jai", "Zheng", 3, NULL , TRUE),
("Jei", "Zhung", 4, NULL , TRUE),
("Kay","Lei", 5, 1, FALSE),
("Key","Lai", 6, 2, FALSE),
("Kai","Lay", 7, 3, FALSE),
("Kei","Ley", 8, 4, FALSE);

SELECT * FROM employee WHERE is_manager = TRUE;
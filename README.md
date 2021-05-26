# Muscle Memory
<img src="https://user-images.githubusercontent.com/39471477/119741484-cdd84d80-be53-11eb-8232-42d0e36e9076.png">

# Technologies used

* React
* MySQL
* Node.js
* Express
* Passport
* Bcrypt

# External Requirements
* [npm](https://www.npmjs.com/)
* [XAMPP](https://www.apachefriends.org/index.html)
* [MySQL Workbench 8.0](https://www.mysql.com/products/workbench/)


# How to run on your machine
1) Clone the repository into your local machine
2) Install the dependencies of the backend and the frontend by going to their respective folders and executing "npm install"
3) Using xampp, host a local MySQL server in your machine.
4) Create a .env file in the server folder.
5) Inside the env file, configure the settings for the database, the port to be used, and the session secret. It should look like this:
<img src="https://user-images.githubusercontent.com/39471477/119742566-16910600-be56-11eb-92b5-0556dbafa2cb.png">

6) Using MySQL workbench, create a new MySQL connection. By default, it should look like this: 

<img src="https://user-images.githubusercontent.com/39471477/119743098-2230fc80-be57-11eb-9309-5f5b7fed5857.png">

7) Create a new schema with any name. Change the DB name in the .env file accordingly.
8) Create a new table by executing this query: 

``CREATE TABLE `(name of schema)`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP);``
  
9) Run the backend using the command `node index.js`
10) Run the frontend using the command `npm start`
11) Visit http://localhost:3000/

If it does not work, make sure that the backend, frontend, and the database are running in different ports and that the names are properly configured in the .env file.


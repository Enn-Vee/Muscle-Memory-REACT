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

# How to run on your machine
1) Clone the repository into your local machine
2) Install the dependencies of the backend and the frontend by going to their respective folders and executing "npm install"
4) Create a .env file in the server folder.
5) Inside the env file, configure the settings for the database, the port to be used, and the session secret. It should look like this:
<img src="https://user-images.githubusercontent.com/39471477/119742566-16910600-be56-11eb-92b5-0556dbafa2cb.png"> 
Where DB can be any name and the session secret can be any string.

3) Using xampp, host a local MySQL server in your machine.
4) Initialize the database by executing `node ./configs/database-init.js` under the /server/ folder.
7) Run the backend using the command `node index.js` in the /server/ folder.
8) Run the frontend using the command `npm start` in the /client/ folder.
9) Visit http://localhost:3000/.

If it does not work, make sure that the backend, frontend, and the database are running in different ports and that the names are properly configured in the .env file.


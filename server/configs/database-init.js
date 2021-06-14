const mysql = require('mysql');
const dotenv = require('dotenv')

let dbName = "muscle_memory";

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.query(`CREATE SCHEMA ${dbName}`, (error, result) => { //Create database
    if(error)
        console.log(error.sqlMessage);
    else 
        console.log('Database created.')
});

db.end();

db = mysql.createConnection({ //Sets database to work with
    host: "localhost",
    user: "root",
    password: "",
    database: dbName
});

db.connect(error => {
    if(error)
        throw error;
    console.log("Connected!")
    createUserTable();
    createExerciseTable();
    createLikesTable();
});

const createUserTable = () => {
    
      
    let createUserTableQuery = "CREATE TABLE `users` (\
        `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
        `username` varchar(12) NOT NULL,\
        `password` varchar(500) NOT NULL,\
        `created_at` datetime NOT NULL DEFAULT current_timestamp(),\
        `email` varchar(255) NOT NULL,\
        `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),\
        PRIMARY KEY (`user_id`),\
        UNIQUE KEY `username_UNIQUE` (`username`),\
        UNIQUE KEY `email_UNIQUE` (`email`)\
      ) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4";
      db.query(createUserTableQuery, (error, results) => {
        if(error)
            console.log(error.sqlMessage);
        else
            console.log("Users table created!")
      })
}

const createExerciseTable = () => {
    let createExerciseTableQuery = "CREATE TABLE `exercises` (\
        `exercise_id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
        `sets` int(10) unsigned NOT NULL,\
        `reps` int(10) unsigned NOT NULL,\
        `description` varchar(2000) NOT NULL,\
        `title` varchar(32) NOT NULL,\
        `video_id` varchar(11) NOT NULL,\
        `target_muscle` varchar(20) NOT NULL,\
        `duration` int(10) unsigned NOT NULL,\
        `created_at` datetime NOT NULL DEFAULT current_timestamp(),\
        `author_id` int(10) unsigned NOT NULL,\
        `difficulty` enum('Very Easy','Easy','Medium','Hard','Very Hard') NOT NULL,\
        `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),\
        PRIMARY KEY (`exercise_id`),\
        UNIQUE KEY `title_UNIQUE` (`title`),\
        KEY `author_id_idx` (`author_id`),\
        CONSTRAINT `author_id` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION\
      ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4";
    db.query(createExerciseTableQuery, (error, result) => {
        if(error)
            console.log(error.sqlMessage)
        else
            console.log('Exercise table created!')
      })
}

const createLikesTable = () => {
    let createLikesTableQuery = "CREATE TABLE `exercise_likes` (\
        `user_id` int(10) unsigned NOT NULL,\
        `exercise_id` int(10) unsigned NOT NULL,\
        `liked_at` datetime NOT NULL DEFAULT current_timestamp(),\
        UNIQUE KEY `like_idx` (`user_id`,`exercise_id`),\
        KEY `user_id_idx` (`user_id`),\
        KEY `exercise_id_idx` (`exercise_id`),\
        CONSTRAINT `exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,\
        CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION\
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    db.query(createLikesTableQuery, (error, result) => {
        if(error)
            console.log(error.sqlMessage);
        else
            console.log('Likes table created!');
    })
}
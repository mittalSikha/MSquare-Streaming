// const mysql = require('mysql');
// const dotenv = require('dotenv');
// let instance = null;
// dotenv.config();

// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.PORT
// });
// 
// connection.connect(function(err) {
//     if(err) {
//         console.log(err);
//     }
// });


// class dbService {
//     static getDbServiceInstance() {
//         return instance ? instance : new DbService(); 
//     }
// 
//     async getAllData() {
//         try {
//             const response = await new Promise((resolve, reject) 
//             => {
//                 const query = "select * from "
//             })
//         }
//         catch(error) {
//             console.log(error);
//         }
//     }
// }
// 
//module.exports = connection;
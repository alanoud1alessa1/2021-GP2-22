;
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");




const router = require('./routes');


const app = express();


// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


app.use(router);


// app.post("/create", (req,res) => {
// const email = req.body.email;
// const age = req.body.age;
// const password = req.body.password;

// db.query(
// "INSERT INTO Admin (username, password) VALUES (?,?)",
// [email ,password ],
// (err, result)=>{
// if(err) {
// console.log(err);

// }else{
// res.send("Values inserted");
// }
// })

// })


// app.get("/admin", (req, res) => {
//   db.query("SELECT * FROM Admin", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   db.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });




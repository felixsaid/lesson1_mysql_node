const express = require("express");
const cors = require("cors");
const app = express();

const mysql = require("./database");

app.use(cors());
app.use(express.json());


//sample endpoint
app.get("/api/home", (req, res) => {
    res.status(200).send({
        name : "Felix Kiamna",
        age : 30
    });
});


//all students

app.get("/api/student", (req, res) => {
    try {
        mysql.query("SELECT * FROM student", function(error, result){
            if(error){
                return res.status(500).send({
                    error: true,
                    message: "An database error occurred"
                });
            }else{
                return res.status(200).send({
                    error: false,
                    data : result,
                    message : "All students have been returned."
                })
            }
        });
    } catch (err) {
        res.status(500).send({
            error : true,
            messsage : err.message
        })
    }
});


// return student by id


app.get("/api/student/:id", (req, res) => {

    const id = req.params.id;

    try {
        mysql.query("SELECT * FROM student WHERE student_id = ?", [id], function(error, result){
            if(error){
                return res.status(500).send({
                    error: true,
                    message: "An database error occurred"
                });
            }else{
                return res.status(200).send({
                    error: false,
                    data : result,
                    message : "All students have been returned."
                })
            }
        });
    } catch (err) {
        res.status(500).send({
            error : true,
            messsage : err.message
        })
    }
});


app.listen(3003, () => {
    console.log("Our server is running on port 3003");
});

var express = require("express");

const router = express.Router();

var emp =require("../controller/Employee/index");

let routes = (app)=> {

    router.post("/createemployee",emp.Employee);
    router.post("/Login",emp.LoginEmployee);
    router.post("/update",emp.updateUser);
    router.post("/delete",emp.DeleteEmployee);
    router.post("/read",emp.ViewEmployee);
    router.get("/ViewAll",emp.ViewAlldata);



    app.use("/api", router);
};


module.exports = routes
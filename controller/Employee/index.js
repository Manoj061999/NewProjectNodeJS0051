'use strict';

let user = require("./service");
const bcrypt = require('bcrypt');


//CREATE EMPLOYEE 

const Employee = async(req , res)=> {
    try{
    const checkUser = await user.ViewAllUserDetails({ email:req.body.email },{ mobile:req.body.mobile });

    if(checkUser.length!=0){
        res.send({status:200 , result:'already' , message:'User Already Exist!'});
        return false
    }

    req.body.status = 'CREATED';

    //date and time
    var date = new Date();
    req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);

    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password , salt);
    req.body.password = hashedpassword;

    //Save Employeedata
    const saveuser = await user.SaveEmployeeDetails(req.body);
    if(saveuser){
        res.send({status:200 , result:'success' , message:'Created Successfully!'});
    }else{
        res.send({status:400 , result:'fail' , message:'Some thing went wrong!'});
    }
}catch(err){
    res.send({status:400 , result:'wrong' , msg:'SOME THING WENT WRONG !'});
   }
}

//LOGIN EMPLOYEE

const LoginEmployee = async(req , res)=> {
try{
    const loginuser = await user.ViewAllUserDetails({email:req.body.email});
    if(loginuser.length!=0){
        
        //COMPARING THE HASHED PASSWORD
        const validpassword = await bcrypt.compare(req.body.password , loginuser[0].password);

        if(validpassword){
            res.send({status:200 , result:'success' , message:'Login Successfully!'});
        }else{
            res.send({status:400 , result:'fail' , message:'Invalid Password!'});
        }
    }else{
        res.send({status:400 , result:'no records' , message:'No User Found!'});
    }
}catch(err){
    res.send({status:400 , result:'wrong' , msg:'SOME THING WENT WRONG !'});
}
}

//UPDATE EMPLOYEE

const updateUser = async(req , res)=> {
    try{
    const viewdata = await user.ViewAllUserDetails({empId:req.body.empId});
    if(viewdata.length!=0){

    var date = new Date();
    req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
                
    const updatedata = await user.UpdateEmployeeDetails(req.body);
        if(updatedata){
            res.send({status:200 , result:'success' , message:'Updated Successfully!'});
        }else{
            res.send({status:400 , result:'fail' , message:'some thing went wrong!'});
        }
    }else{
      res.send({status:200 , result:'wrong' , message:'No User Found!'});  
    }
}catch(err){
    res.send({status:400 , result:'wrong' , msg:'SOME THING WENT WRONG!'});
}
}

//DELETE 

const DeleteEmployee = async(req , res)=> {
    try{
    const viewdata = await user.ViewAllUserDetails({empId:req.body.empId});
    if(viewdata.length!=0){
        
        const deletedata = await user.DeleteEmployeeDetails(req.body);
        if(deletedata){
            res.send({status:200 , result:'success' , message:'Deleted Successfully!'});
        }else{
            res.send({status:400 , result:'fail' , message:'some thing went wrong!'});
        }
    }else{
        res.send({status:400 , result:'wrong' , message:'No User Found!'});
    }
}catch(err){
    res.send({status:400 , result:'wrong' , msg:'SOME THING WENT WRONG!'});
}
}

//VIEW EMPLOYEE RECORDS USING EMP ID

const ViewEmployee = async(req , res)=> {
    try{
    const viewdata = await user.ViewAllUserDetails({empId:req.body.empId});
    if(viewdata.length!=0){
        res.send({status:200 ,  result:'success' , message:viewdata});
    }else{
        res.send({status:400 ,  result:'fail' , message:'No User Found!'});
    }
}catch(err){
    res.send({status:400 , result:'wrong' , msg:'SOME THING WENT WRONG !'});
}
}

//VIEW ALL EMPLOYEE RECORDS

const ViewAlldata = async(req , res)=> {
    try{
    const viewall = await user.ViewAllUserDetails(req.body);
    if(viewall.length!=0){

    const viewdata = await user.ViewAllRecords();
     if(viewdata){
         res.send({status:200 , result:'success' , message:viewdata});
     }else{
         res.send({status:400 , result:'fail' , message:'Some thing went wrong'});
     }
    }else{
        res.send({status:400 , result:'wrong' , message:'No User Found!'});
    }
}catch(err){
    res.send({status:400 , result:'wrong' , msg:'SOME THING WENT WRONG!'})
    }
}

module.exports = {
    Employee,
    LoginEmployee,
    updateUser,
    DeleteEmployee,
    ViewEmployee,
    ViewAlldata
    
}
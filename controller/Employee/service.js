'use strict';
const { query } = require('express');
const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
    "Empname" :String,
    "empId":String,
    "email":String,
    "mobile": Number,
    "dob" : String,
    "status":String,
    "password": String,
    "gender": String,
    "address":String,
    "isActive": Boolean,
    "createdOn": String
  });

const model = mongoose.model('Employee', employeeSchema);

const SaveEmployeeDetails = async(data)=>{
    try{
    const emp = new model(data);
    const savedata = await emp.save();
    return savedata;
    }catch(err){
        return false
    }

}


const UpdateEmployeeDetails = async(data)=> {
try{
    const updatedata = await model.updateMany(
        {"empId":data.empId},
        {$set: {"dob":data.dob,
                "mobile":data.mobile,
                "address":data.address,
                "isActive":true,
                 "createdOn":data.createdOn}},
            { new : true }
            );
            return updatedata
    }catch(err){
        return false
    }
}


const DeleteEmployeeDetails = async(data)=>{
    try{
    const deletedata = await model.deleteOne({empId:data.empId});
    return deletedata;
    }catch(err){
        return false
    }
}


const ViewAllUserDetails = async(data)=> {
try{
    var user ;
    var query = [];
    query.push({$match: {"status":"CREATED"}});
    if(data.empId){
        query.push({$match: {empId:data.empId}});
    }
    if(data.email){
        query.push({$match: {email:data.email}});
    }
    if(data.searchdata){
        query.push({$match: {$or: [{Empname:data.searchdata},
                                    {mobile:data.searchdata}] }});
    }
    user = await model.aggregate([
        query
    ]);
return user;
}catch(err){
    return false
   }
}

const ViewAllRecords = async()=>{
    try{
    const viewdata = await model.aggregate([
        {$match: {"status":"CREATED"}},
        {$group: {
            _id: {date: {$substr :["$createdOn",0 ,10]},
                    Empname:"$Empname",
                    empId:"$empId",
                    email : "$email",
                    dob:"$dob",
                    mobile:"$mobile",
                    gender:"$gender",
                    address:"$address",
                    isActive:"$isActive"}
        }}
    ]);
    return viewdata
}catch(err){
    return false
}
}








module.exports = {
    SaveEmployeeDetails,
    UpdateEmployeeDetails,
    DeleteEmployeeDetails,
    ViewAllUserDetails,
    ViewAllRecords
}
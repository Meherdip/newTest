const express = require('express');
const mysqlConnection=require('../config/dbs')
var mysql   = require("mysql2");
var md5 = require("MD5");


var addNewUser = function(req,res,  ){
var date = new Date();
   var post  = {
     koid:req.body.koid,
     name:req.body.name,
     pincode:req.body.pincode,
     password:md5(req.body.password),
     location:req.body.location

 };
       var query = "SELECT koid FROM ?? WHERE ??=?";

       var table = ["csp", "koid", post.koid];

       query = mysql.format(query,table);

       mysqlConnection.query(query,function(err,rows){
       if(err) {
           res.json({"Error" : true, "Message" : "Error executing MySQL query","err":err});
       }
       else {

       if(rows.length==0){

           var query = "INSERT INTO  ?? SET  ?";
           var table = ["csp"];
           query = mysql.format(query,table);
           mysqlConnection.query(query, post, function(err,rows){
               if(err) {
                   res.json({"Error" : true, "Message" : "Error executing MySQL query","err":err});
               } else {
                   res.json({"Error" : false, "Message" : "Success"});
               }
           });

       }
       else{
           res.json({"Error" : false, "Message" : "Email Id already registered"});
       }
       }
   });
   }

  module.exports = addNewUser;
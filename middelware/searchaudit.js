const express = require('express');
const mysqlConnection=require('../config/dbs')
var mysql   = require("mysql2");
var md5 = require("MD5");

var searchAudit = function(req,res){
 
    
    var query = "SELECT * FROM  ?? WHERE koid= ? and date= ? ";
               var table = ["daily_audit",req.body.koid,req.body.date];
               query = mysql.format(query,table);
               mysqlConnection.query(query,function(err,rows){
                   if(err) {
                       res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                   } else {
                       res.json({"Error" : false, "Message" : "Success","row":rows});
                       
                   }
               });
    
    
       }

    
      module.exports = searchAudit;
      
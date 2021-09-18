const express = require('express');
const mysqlConnection=require('../config/dbs')
var mysql   = require("mysql2");
var md5 = require("MD5");


var auditCount = function(req,res ){

    post={
        koid:req.body.koid
    }
           var query = "Select count(*) as totalRow from ?? where ?";
           var table = ["audit_details"];
           query = mysql.format(query,table);

           mysqlConnection.query(query, post, function(err,rows){
               if(err) {
                   console.log(err)
                   res.json({"Error" : true, "Message" : "Error executing MySQL query"});
               } else {
                   res.json({"Error" : false, "Message" : "Success", "totalAudit":rows[0].totalRow});
                   
               }
           });

   }


   var totalAudits = function(req,res ){

    post={
        koid:req.body.koid
    }

           var query = "Select * from ?? where ?";
           var table = ["audit_details"];
           query = mysql.format(query,table);
           mysqlConnection.query(query, post, function(err,rows){
               if(err) {
                   console.log(err)
                   res.json({"Error" : true, "Message" : "Error executing MySQL query"});
               } else {
                   res.json({"Error" : false, "Message" : "Success", "totalAudit":rows});
                   
               }
           });

   }


     var auditByid = function(req,res ){

    post={
        audit_id:req.body.audit_id,
        koid:req.body.koid
    }

           var query = "Select * from ?? where ? and ?";
           var table = ["audit_details"];
           query = mysql.format(query,table);
           var qw=mysqlConnection.query(query, post, function(err,rows){
               if(err) {
                   console.log(qw.sql)
                   res.json({"Error" : true, "Message" : "Error executing MySQL query"});
               } else {
                        console.log(qw.sql)
                   res.json({"Error" : false, "Message" : "Success", "totalAudit":rows});
                   
               }
           });

   }
  //module.exports = [auditCount,totalAudits];
//   module.exports = auditCount
//   module.exports = totalAudits

  module.exports = {
    auditCount: auditCount,
    totalAudits: totalAudits,
    auditByid:auditByid
};

  
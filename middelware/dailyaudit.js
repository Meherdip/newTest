const express = require('express');
const mysqlConnection=require('../config/dbs')
var mysql   = require("mysql2");
var md5 = require("MD5");

var addDailyAudit = function(req,res ){
var post={
date:req.body.date,    
koid:req.body.koid,
op10:req.body.op10,
op20:req.body.op20,
op50:req.body.op50,
op100:req.body.op100,
op200:req.body.op200,
op500:req.body.op500,
op2000:req.body.op2000,
opcoins:req.body.opcoins,
optotalcash:req.body.optotalcash,
opACBalance:req.body.opACBalance,
opBCBalance:req.body.opBCBalance,
startSum:req.body.startSum,
cl10:req.body.cl10,
cl20:req.body.cl20,
cl50:req.body.cl50,
cl100:req.body.cl100,
cl200:req.body.cl200,
cl500:req.body.cl500,
cl2000:req.body.cl2000,  
clcoins:req.body.clcoins,
cltotalcash:req.body.cltotalcash,
clBCBalance:req.body.clBCBalance,
clACBalance:req.body.clACBalance,
dayDiposit:req.body.dayDiposit,
dayWithdrawl:req.body.dayWithdrawl,
cashTranferToLimit:req.body.cashTranferToLimit,
cashTakenFromLimit:req.body.cashTakenFromLimit,
auditResult:req.body.auditResult,
endSum:req.body.endSum,
diffrence:req.body.diffrence,
remark:req.body.remark,
auditStatus:req.body.auditStatus,
personalCashAdded:req.body.personalCashAdded
}

           var query = "INSERT INTO  ?? SET  ?";
           var table = ["audit_details"];
           query = mysql.format(query,table);
           console.log("WE are reches")
           mysqlConnection.query(query, post, function(err,rows){
               if(err) {
                   console.log(err)
                   res.json({"Error" : true, "Message" : "Error executing MySQL query"});
               } else {
                   res.json({"Error" : false, "Message" : "Success", "audit_id":rows.insertId});
                   
               }
           });


   }

  module.exports = addDailyAudit;
  
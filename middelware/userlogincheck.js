const express = require('express');
const mysqlConnection=require('../config/dbs')
var mysql   = require("mysql2");
var md5 = require("MD5");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/lockeraccess');
// get our config file


var userLoginCheck = function (req, res) {

	//var em = req.body.email || req.query.email;
	var post  = {
		password:req.body.password,
		koid:req.body.koid
	}

	var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";

	var table = ["csp","password",  md5(post.password), "koid", post.koid];

	query = mysql.format(query,table);

	mysqlConnection.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query"});
		}
		else {
			if(rows.length==1){
				var singObj={
					koid:rows[0].koid,
					id:rows[0].id

				}
				var token = jwt.sign(singObj, config.secret, {
					expiresIn: 1440
				});
				koid= rows[0].koid;
			const	name=rows[0].name;
				var data  = {
					koid:rows[0].koid,
					device_type:"test_type",
					access_token:token
					
				}
				var query = "INSERT INTO  ?? SET  ?";
				var table = ["access_token"];
				query = mysql.format(query,table);
				mysqlConnection.query(query, data, function(err,rows){
					if(err) {
						res.json({"Error" : true, "Message" : "Error executing MySQL query", "NEW":err});
					} else {
						res.json({
							success: true,
							message: 'Token generated',
							token: token,
							currUser: koid,
							name:name
						});
           				 } // return info including token
           				});
			}
			else {
				res.json({"Error" : true, "Message" : "wrong email/password combination"});
			}

		}
	});
	
}

module.exports = userLoginCheck;




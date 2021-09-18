const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysqlConnection=require('./config/dbs')
var addNewUser = require('./middelware/adduser');
var addDailyAudit = require('./middelware/dailyaudit');
var searchAudit=require('./middelware/searchaudit')
var userLoginCheck = require('./middelware/userlogincheck');
var verifyToken = require('./middelware/verifytoken');
var welcome = require('./middelware/welcome');
var cors = require('cors');
var {auditCount,totalAudits,auditByid}= require('./middelware/auditcount')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000;

console.log(`Your port is ${process.env.PORT}`); 


app.use(cors());

// app.listen(port,function() {
//   console.log('Express server listening on port ' +process.env.PORT);
// }); 


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get('/', (req, res) => {
  res.send('Welcome to my aPaaS ')
})
app.post('/api/signup', addNewUser);
app.post('/api/userlogin', userLoginCheck);

var apiRoutes = express.Router();
app.use(apiRoutes)
apiRoutes.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json());
//route middleware to verify a token 
apiRoutes.use(verifyToken);

apiRoutes.get('/new', welcome);
//apiRoutes.get('/users', findAllUsers);
apiRoutes.post('/insertaudit',addDailyAudit)
apiRoutes.post('/searchAudit',searchAudit)
apiRoutes.post('/getAuditCount',auditCount)
apiRoutes.post('/getTotalAudits',totalAudits)
apiRoutes.post('/getAuditById',auditByid)
app.use('/newapi', apiRoutes);




  

  
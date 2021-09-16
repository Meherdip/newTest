const express = require('express');
//var md5 = require("md5");
const app = express();

app.get('/', (req, res) => {
    res.send('Desi Rushikesh .Com Hot boy rushikesh ...')
  })
  
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  
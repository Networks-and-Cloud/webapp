const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

const mysql = require('mysql2');

app.get('/health', (req,res) => {
  let isHealthy =false
  var connection = mysql.createConnection({
  host:"localhost",
  port: '3306',
  user:"root",
  password:"root@123",
  database: "sys"
});  
res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");

if(req.get('Content-Length')>0){
  res.status(400).send();
}
 connection.connect(function(err) {
        if (err) {
            isHealthy = false
        }else{
            isHealthy = true
        }
    
      
        if(isHealthy){  
          
          //add no cache header
          
          //success message
          res.status(200).send();
          
        }
        else{  
         
           res.status(503).send();
        }
      });
      
      

});


app.get('/healthz', (req, res, next) => {
  if (req.method != 'GET') {
    res.status(405).send();
  } else {
    next();
  }
});


app.listen(port, () => {
  console.log(`health check app listening on port ${port}`);
});



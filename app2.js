import Express from "express";
import userRoutes from "./routes/userRoutes.js";
import mysql from "mysql";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import sequelize from "./config/dbConfig.js";
import { bootstrap } from "./services/UserServices.js";
//import assessHealth from './services/HealthRoutes.js';
import logger from "./logger.js";
import StatsD from 'node-statsd';
const client = new StatsD({
  errorHandler: function (error) {
    console.error("StatsD error: ", error);
  }
});

// import winston from "winston/lib/winston/config/index.js";

//const StatsD = require('node-statsd');
/*
const StatsD = require('node-statsd');
const client = new StatsD({
  errorHandler: function (error) {
    console.error("StatsD error: ", error);
  }
});
 client.increment('endpoint.healthz.hits');
 

*/

const app = Express();
const PORT = 3000;

app.use(Express.json());
const submissionAttempts = {};



app.use( async (req, res,next) => {
  try {
    
    await sequelize.authenticate();
    next();
  } catch (error) {
    return res.status(503).send();
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,x-access-token"
  );
  next();
});

app.use(userRoutes);
app.use(assignmentRoutes);



app.get("/healthz",(req,res)=>{
  logger.info('Health check request received');
  client.increment('endpoint.healthz.hit');
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");


  if (req.get("Content-Length") > 0) {
   return res.status(400).send();
  }
  return res.status(200).send();
})

app.all("/healthz",(req,res)=>{
  if (req.method != 'GET') {
    res.status(405).send();
  } else {
    next();
  }});



//  app.use("/healthz",assessHealth);
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

bootstrap();
export default app;

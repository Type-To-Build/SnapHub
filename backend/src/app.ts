import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import { connectToDb } from "./utils/db";

require("dotenv").config();
const express = require("express");
const app = express();
const fs = require('fs'); 

connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true })) ;
app.use(cors());

var files = fs.readdirSync('src/modules');   
for(var i in files){
  if (fs.existsSync(`src/modules/${files[i]}/route.ts`)) {
    app.use('/api/v1/',require(`./modules/${files[i]}/route`));
  } 
}

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

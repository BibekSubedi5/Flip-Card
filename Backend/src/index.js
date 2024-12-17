import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./DB/index.js";

import { app } from "./app.js";


dotenv.config({
    path:"./.env"
});






  const PORT=process.env.PORT || 3000;


  connectDB() 
  .then(()=>{
      app.listen(process.env.PORT ,()=>{
          console.log(`Server is running at port ${PORT}`)
          
      } )
  })
  .catch((error)=>{
   console.log("MONGODB connection errorr",error);    
  })
  
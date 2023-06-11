require("dotenv").config();
const express = require("express");
const app = express(); 
const mongoose =require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");


const Products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);




const port = 8005;

app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
});

DefaultData();

// cors : when we send data from backend to frontent then show an error "cross origin platform" becaouse our frontent are running on 3000 port number and backend running on 8500 port . so we install:- "npm i cors"

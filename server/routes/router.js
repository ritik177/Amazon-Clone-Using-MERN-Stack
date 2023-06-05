const express = require("express");
const router = new express.Router();
const Products= require("../models/productsSchema");


//http method for api call to get data.
//get productsdata api
router.get("/getproducts",async(req,res)=>{
    try{
        const productsdata = await Products.find();
        // console.log("console the data" + productsdata);
        res.status(201).json(productsdata); 
    }catch(error){
        console.log("error" + error.message);
    }
})



// get indivisual data 

router.get("/getproductsone/:id",async(req,res)=>{
    try {
        const {id} =req.params;
        // console.log(id);
        const indivisualdata = await Products.findOne({id:id})

        // console.log(indivisualdata + "indivisual data");
        res.status(201).json(indivisualdata);

    } catch (error) {
        res.status(400).json(indivisualdata);
        console.log("erroe" + error.message);
        
    }
})



module.exports = router;
const express = require("express");
const router = new express.Router();
const Products= require("../models/productsSchema");
const USER = require("../models/userSchema");


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

// register data 


router.post("/register",async(req,res)=>{
//  console.log(req.body);

const {fname,email,mobile,password,cpassword}= req.body;

if(!fname || !email || !mobile || !password || !cpassword){
    res.status(422).json({error:"please fill all the fields"});
    console.log("not data available");
};
     try{
        const preuser = await USER.findOne({email: email});

        if(preuser){
        res.status(422).json({error:"user already exists"});
        }else if(password !== cpassword){
        res.status(422).json({error:"passwords do not match"});
       }else{
        const finalUser = new USER({
            fname,email,mobile,password,cpassword
        });

        //bcryptjs 

        // password hashing process will done here 

        
       
       const storedata = await finalUser.save();
        console.log(storedata);
        res.status(201).json(storedata);
         
    }
 
  }catch(error){
  
}

});



module.exports = router;
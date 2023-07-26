const express = require("express");
const router = new express.Router();
const Products= require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


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


// Login  User API 

router.post("/login",async(req,res)=>{
  const {email,password} = req.body;

  if(!email || !password){
    res.status(400).json({error:"please fill all the fields"});
  };
  try{
    const userlogin = await USER.findOne({email: email});
    console.log(userlogin + "user value");

    if(userlogin){
        const isMatch = await bcrypt.compare(password,userlogin.password);
        console.log(isMatch);

        // token generation should be done here  

        const token  = await userlogin.generateAuthtoken();
        // console.log(token);

  res.cookie("Amazonweb",token,{
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
  })

    
     if(!isMatch){
        res.status(400).json({error:"invalid   detials"});
     }
     else{
        res.status(200).json(userlogin);
     }
    }else{
        res.status(400).json({error:"invalid detials"});
    }
  }catch(error){
   res.status(400).json({error:"invalid details"});
}  
})


//  adding data into cart


router.post("/addcart/:id", authenticate, async(req,res)=>{
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id:id});
        console.log(cart + "cart value");


        const UserContact  =  await USER.findOne({_id:req.userID});
        console.log(UserContact);

        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
        }else{
            res.status(401).json({error:"invalid user detials"});
        }
 
    } catch (error) {
        res.status(401).json({error:"invalid user detials"});
    }
});

// get cart details 

router.get("/cartdetails",authenticate,async(req,res)=>{
    try {
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error" + error);
    }
})

// get valid user

router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const validuserone = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error" + error);
    }
});


//remove item from cart 

router.delete("/remove/:id", authenticate,async(req, res)=>{
    try {
        const {id} = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((currentvalue)=>{
            return currentvalue.id !== id;
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item removed");
    } catch (error) {
        console.log("error" + error);
        res.status(400).json(req.rootUser);
        
    }
});


// for user Logout

router.get("/logout",authenticate,async(req,res)=>{
    try {
         req.rootUser.tokens = req.rootUser.tokens.filter((current_element)=>{
            return current_element.token !== req.token 
         });

       res.clearCookie("Amazonweb",{path:"/"});

       req.rootUser.save();
       res.status(201).json(req.rootUser.tokens);
       console.log("user logged out");

    } catch (error) {
        console.log("error for user Logout");
    }
});

module.exports = router;
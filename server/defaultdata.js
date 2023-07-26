const Products = require("./models/productsSchema");
const productsdata = require("./constant/productsdata");


const DefaultData = async() =>{
    try{

        await Products.deleteMany({});

        const storeData = await Products.insertMany(productsdata);
        // insertMany is a methode of mongo to add data . there are multiple data in an array so we use insertMany . if one data then we use insert and it store in object data.

        console.log(storeData);
    }catch(error){
        console.log("error" + error.message);
    
    }
};

module.exports= DefaultData; 
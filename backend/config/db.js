const mongoose=require("mongoose")//Object Data Modeling (ODM) library for MongoDB and Node.js
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("successfully connected to mongodb")
    }
    catch(error){
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}
module.exports=connectDB;
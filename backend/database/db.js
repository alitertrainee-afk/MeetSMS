import mongoose from "mongoose"

export const connect = async()=>{
    try {

   const db = await mongoose.connect(process.env.MONGODB_URL)
   console.log("🚀 ~ connect ~ db:", db.connection.host)

   
        
    } catch (error) {
        console.log("db connection failed")
        console.error(error)
        process.exit(1)
    }
}
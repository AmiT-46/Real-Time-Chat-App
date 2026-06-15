
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect to MongoDB successfully");
    }catch(error){
        console.log("Error connecting to MongoDB", error.message);
    }
}

module.exports = connectToMongoDB;

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


const authRouter = require('./routes/auth.routes.js');
const connectToMongoDB = require('./db/connnectToMongoDB.js');

app.use(express.json());


app.use('/api/auth', authRouter);

app.get('/api/health', (req, res)=>{
    res.status(200).json({
        message : "API is running"
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    connectToMongoDB();
    console.log("Server is running on port 3000");
});
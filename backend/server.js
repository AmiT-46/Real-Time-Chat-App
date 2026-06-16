const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const authRouter = require('./routes/auth.routes.js');
const connectToMongoDB = require('./db/connnectToMongoDB.js');
const messageRoutes = require('./routes/message.routes.js');

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('api/messages', messageRoutes);

app.get('/api/health', (req, res)=>{
    res.status(200).json({
        message : "API is running"
    })
})

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log("Server is running on port 3000");
});
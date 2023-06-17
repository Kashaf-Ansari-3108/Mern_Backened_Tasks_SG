const express = require('express');
const userRouter = require('./routes/UserRoutes');
const connectDB = require('./db/db');
require('dotenv').config({path:'./config.env'});

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    res.send("API HIT!!!");
});

//connectDB
connectDB();

//middleware

//routes
app.use(express.json());

//connect app
app.use('/api',userRouter);




app.listen(PORT, ()=>console.log(`Server is running on PORT ${PORT}`));
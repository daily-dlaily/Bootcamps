const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middlewares/error')


//load env vars
dotenv.config({path:'./config/config.env'}); 
connectDB();

// Route files  
const bootcamps = require('./routes/bootcamps')
const app = express();
//Body parser 
app.use(express.json());

// Dev logging middleware 
if( process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
    // Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen( PORT, 
 console.log(` server is connected via port ${PORT}, using  ${process.env.NODE_ENV } mode `.yellow.bold)

)
const ErrorResponse = require('../utils/errorResponse');


const errorHandler = (err, req, res, next) => {
    let error = {...err}
    error.message = err.message;

    // log to console for dev
    console.log(err.stack.red);
    //Mongoose bad ObjectID
    if (err.name === 'CastError'){
        const message = `Bootcamp not found with the id ${err.value}`
        error = new ErrorResponse(message, 404);
    }
    //Mongoose duplicate key 
    if (err.code === 11000){
        const message = 'Duplicated field value entres';
        error = new ErrorResponse(message, 400);
    }

    //Mongoose Validation Error
    if (err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode|| 500 ).json({
        sucess: false,
        error: error.message|| ' Server Error'
    });

};

module.exports = errorHandler;
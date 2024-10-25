/*const errorMiddleware=(err,req,res,next)=>{

    err.message =err.message || "Internal Server Error"
    err.statuscode=err.statuscode || 500
    // console.log(err.message)

    if(err.code == 11000){
        const key=Object.keys(err.keyValue)[0];
        const value=err.keyValue[key]
        err.message=`Already Exist : ${key} : ${value} `
    }

    return res.status(err.statuscode).json({
        success:false,
        message:err.message
    })
}


class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode
    }
}

export {ErrorHandler,errorMiddleware} */ 

const errorMiddleware = (err, req, res, next) => { 
    // Initialize default values for message and status code    
    console.log(err); 
    const message = typeof err.message === 'string' ? err.message : 'Internal Server Error';
    const statusCode = err.statuscode || 500;

    // Handle specific error code for MongoDB duplicates
    if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        const value = err.keyValue[key];
        err.message = `Already Exist: ${key}: ${value}`;
    }

    // Log the error for debugging purposes (optional)
    console.error(err); // This will print the error details to the console

    // Send response
    return res.status(statusCode).json({
        success: false,
        message: message
    });
};

class ErrorHandler extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    }
}

export { ErrorHandler, errorMiddleware };
 
const errorHandler = (error,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack : error.stack, //remove this if in production
    });
};

const notFound = (req,res,next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(400);
    next(error); //passes on the error to the next middleware, error handling
};

module.exports = {
    notFound,
    errorHandler,
};
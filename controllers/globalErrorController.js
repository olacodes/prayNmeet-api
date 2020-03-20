const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
        
    // Programming error or other
    } else {
        //  1) Log error
        console.error('ERROR ☀☀☀', err)

        // Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

const globalErrorHnadler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res)
    }

}
module.exports = globalErrorHnadler
const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routes/userRoutes')
const globalErrorHandlers = require('./controllers/globalErrorController')
const AppError = require('./utils/appError')
const app = express()

if (process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'))
}
app.use(express.json())

app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`))
})

app.use(globalErrorHandlers)

module.exports =  app

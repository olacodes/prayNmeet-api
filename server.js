process.on('uncaughtException', err => {
    console.log(err.name, err.message)
    console.log("UNCAUGHT EXCEPTOIN shutting down ...")
    process.exit(1)
})
require('./db')

const app = require('./app')


const port = process.env.PORT || 3000
const server  = app.listen(port, () => console.log(`Development server started at port ${port}`))
process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log("UNHANDLED REJECTION shutting down ...")
    server.close(() => {process.exit(1)})
})
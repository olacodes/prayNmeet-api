const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const mongoose = require('mongoose')


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
const DB_LOCAL = process.env.DATABASE_LOCAL

console.log(process.env.NODE_ENV)


if (process.env.NODE_ENV == 'development') {
    mongoose.connect(DB_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    })
    .then(con => console.log("Mongoose connect to development DB"))
    .catch(err => console.log("An Error occured while trying to connect to development DB"))
}

else if (process.env.NODE_ENV == 'production') { 
    mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
    })
    .then(con => console.log("Mongoose connect to development DB"))
    .catch(err => console.log("An Error occured while trying to connect to development DB" + err))
}
else {
    throw new Error({'err': "Cannot connect to any database"})
}
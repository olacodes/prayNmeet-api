require('./db')
const app = require('./app')


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Development server started at port ${port}`))

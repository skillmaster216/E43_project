const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection')

const app = express()

//importing routes
const theaterRoutes = require('./routes/theater')
const customerRoutes = require('./routes/customer')

//settings
app.set('port', process.env.PORT || 3010)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//middlewares
app.use(morgan('dev'))
app.use( myConnection( mysql, {
    host: "localhost",
    user: 'root',
    password: '',
    port: 3306,
    database: 'e43proyect'
}, 'single'))

app.use(express.urlencoded({extended: false}))


//routes
app.use('/', theaterRoutes, customerRoutes)

//starting the server
app.listen( app.get('port'), () => {
    console.log('Server on port 3010')
})
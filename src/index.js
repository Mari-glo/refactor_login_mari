const express = require('express')
const handlebars = require('express-handlebars')
const routerServer = require('./routes')
const { connectDb } = require('./config/config')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require ('session-file-store')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const { initPassport } = require('./config/passport.config.js')

const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io')



const app = express()
const PORT = 8080

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser('6274'))

app.use (session({
     store: MongoStore.create({
         mongoUrl:"mongodb+srv://mariD:NOTpwuJtPwyuWFeU@cluster0.nn1ed1f.mongodb.net/ecommerce_mari?retryWrites=true&w=majority",
         mongoOptions: {   
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        },
         ttl: 150000

     }),
     secret: '6274',
     resave: true,
     saveUninitialized: true

}))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('hbs', handlebars.engine({
    extname:'.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(cookieParser())




app.use(routerServer)

app.listen(PORT, ()=>{
    console.log(`escuchando desde puerto ${PORT}`)
})
const express = require('express')
const connectDB = require('./config/db.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const app = express()
const port = 5000
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')  

// Connecting to the database 
connectDB();


// Middlewares 
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.SECURITY, sameSite: 'Lax' } // Change secure to true in production
}));

// Routes :-
app.get('/', (req, res) => {
  res.send('Hello locator')
})
app.use('/auth',authRoute); // Auth routes
app.use('/user',userRoute); // User routes


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//This is the entry point to the express app server. All the app related configurations should be done in here
console.log('Loading app.js...');
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const userManagementRoutes = require('./routes/userManagementRoutes');
const notificationRoute = require('./routes/notificationRoutes')
const adminRoutes = require('./routes/adminRoutes')
const bodyParser = require('body-parser');

const progressDetails = require('./routes/progressRoutes')

const dietplan = require('./routes/dietplan')

const exerciseDemoRoutes = require('./routes/exerciseDemoRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const appRouter = express.Router();
const secretKey = crypto.randomBytes(32).toString('hex');
const path = require('path')

/*jeewa's part-start*/
const exerciseRoutes = require('./routes/exerciseRoutes')
/*jeewa's part-end*/

/*Mihisara's part-start*/
const workoutRoutes = require('./routes/workouts')
/*Mihisara's part-end*/

const instructorRoutes = require('./routes/Instructors')

const faqRoutes = require('./routes/FAQ')

const feedbackRoutes = require('./routes/feedbacksRoute')
const allFeedbacksRoutes = require('./routes/allFeedbackRoutes')

//Setting up session middleware
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure:true,
    maxAge: 3600000, // 1 hour
    sameSite: false, // this may need to be false is you are accessing from another React app
    httpOnly: false,
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting up other middlewares
app.use(cookieParser());

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', appRouter);

app.use('/', userManagementRoutes);

app.use('/', workoutRoutes)

app.use('/', exerciseDemoRoutes);

app.use('/',notificationRoute);

app.use('/', adminRoutes);

app.use('/api/exDemo/', exerciseRoutes);

app.use('/api/progressdetail', progressDetails);

app.use('/api/Instructors',instructorRoutes);

app.use('/api/dietPlan', dietplan);

app.use('/api/FAQ',faqRoutes);

app.use('/api/feedbacks', feedbackRoutes)

app.use('/api/allfeedback', allFeedbacksRoutes)


module.exports = app;
console.log('Exporting app instance...');
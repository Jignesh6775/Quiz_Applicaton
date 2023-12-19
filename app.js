const express = require('express');
const rateLimit = require('express-rate-limit');
const quizRoutes = require('./Routes/quizRoutes')
const authRoutes = require('./Routes/authRoutes')
const { startQuizStatusUpdate } = require('./Utils/cronJobs')

const connection = require('./Config/db')
require('dotenv').config()

const PORT = process.env.PORT || 8080;
const app = express();

//middleware
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))


//connect to MongoDB
connection.then(async () => {
    // Start cron job for quiz status updates
    startQuizStatusUpdate();
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Not connected to MongoDB');
    console.error(error);
});


//Routes
app.use('/auth', authRoutes)
app.use('/quizzes', quizRoutes)



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
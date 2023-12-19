const cron = require('cron')
const QuizModel = require('../Models/quizModel')
const connection = require('../Config/db')

const startQuizStatusUpdate = () => {
    new cron.CronJob('0 */5 * * * *', async () => {
        try {
            await connection
            // Logic to update quiz status (set active to false) after 5 minutes of end time
            const now = new Date();
            await QuizModel.updateMany(
                { endDate: { $lte: now }, active: true },
                { $set: { active: false } }
            );
        } catch (error) {
            console.log(error);
        }
    }).start()
}

module.exports = { startQuizStatusUpdate }
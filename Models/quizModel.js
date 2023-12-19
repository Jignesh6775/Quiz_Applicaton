const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {type: String, required: true},
    options: [ {type: String, required: true} ],
    rightAnswer: {type: Number, required: true}, 
})

const quizSchema = new mongoose.Schema({
    title: {type: String, required: true},
    questions: [questionSchema],
    startDate: {
        type: Date, 
        required: true,
        validate: {
            validator: function(startDate) {
                return startDate < this.endDate
            },
            message: 'Start date must be before end date'
        }
    },
    endDate: {type: Date, required: true},
    active: {type: Boolean, default: true},
})

const QuizModel = mongoose.model('Quiz', quizSchema)

module.exports = QuizModel;
const QuizModel = require('../Models/quizModel')

exports.createQuiz = async (req, res) => {
    const { title, questions, startDate, endDate } = req.body
    try{
        const quiz = new QuizModel({ title, questions, startDate, endDate })
        await quiz.save()
        res.status(201).json({ message: "Quiz created successfully" })
    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(400).json({ message: error.message })
        }else{
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}

exports.getActiveQuiz = async (req, res) => {
    try{
        const quiz = await QuizModel.findOne({ active: true })
        res.status(200).json(quiz)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getQuizResult = async (req, res) => {
    const {id} = req.params
    try{
        const quiz = await QuizModel.findById(id)

        if(!quiz) return res.status(404).json({ message: "Quiz not found" })

        if(quiz.active) return res.status(400).json({ message: "Quiz is still active" })
        
        //Calculate quiz result
        const totalQuestions = quiz.questions.length
        const correctAnswers = quiz.questions.filter(
            (que, index) => que.rightAnswer === req.body.answers[index]
        ).length

        const score = (correctAnswers / totalQuestions) * 100

        res.status(200).json({ "Total Questions": totalQuestions, "Correct Answers": correctAnswers, "Score": score })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllQuizzes = async (req, res) => {
    try{
        const quizzes = await QuizModel.find()
        res.status(200).json(quizzes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
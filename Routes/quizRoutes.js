const express = require('express');
const quizController = require('../Controllers/quizController')
const verifyToken = require('../Middlewares/authMiddleware');

const router = express.Router();

router.post('/create', verifyToken, quizController.createQuiz);
router.get('/active', verifyToken, quizController.getActiveQuiz);
router.get('/:id/result', verifyToken, quizController.getQuizResult);
router.get('/all', verifyToken, quizController.getAllQuizzes);

module.exports = router;
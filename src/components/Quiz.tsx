import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';
// Hint: Take advantage of the QuizQuestion interface

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  const [quizCore, setQuizCore] = useState<QuizCore>(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(quizCore.getCurrentQuestion());

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  }

  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
    if (!selectedAnswer) {
      alert("Please choose your answer!");
    } else {
      quizCore.answerQuestion(selectedAnswer);
      setSelectedAnswer(null);
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
    }
  }

  const handleRestartClick = (): void => {
    const newQuizCore = new QuizCore();
    setQuizCore(newQuizCore);
    setSelectedAnswer(null);
    setCurrentQuestion(newQuizCore.getCurrentQuestion());
  }

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
        <button onClick={handleRestartClick}>Restart</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>{quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}</button>
    </div>
  );
};

export default Quiz;
'use client';

import '../styles/globals.css';
import React, { useEffect, useState } from 'react';
import questionsData from './data/questions.json';
import ThemeToggle from '../components/ui/ThemeToggle';
import { Timer } from 'lucide-react';

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function DrivingTestApp() {
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(25);

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...questionsData]));
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  useEffect(() => {
    if (timer === 0 && !isFinished && !result) {
      setResult('Incorrect');
      setShowExplanation(true);
      setIsCorrectAnswer(false);
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, isFinished, result]);

  const handleAnswer = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) setScore((prev) => prev + 1);
    setResult(isCorrect ? 'Correct!' : 'Incorrect');
    setShowExplanation(true);
    setIsCorrectAnswer(isCorrect);
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setResult(null);
      setShowExplanation(false);
      setIsCorrectAnswer(null);
      setTimer(30);
    } else {
      setIsFinished(true);
    }
  };

  if (!currentQuestion) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-black dark:text-white relative">
        <div className="absolute top-2 right-2">
          <ThemeToggle />
        </div>

        <h1 className="text-2xl font-bold mb-2">NY Driving Test</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Question: {currentQuestionIndex + 1}/{shuffledQuestions.length}
        </p>

        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded mb-2">
          <div className="h-full bg-blue-500 rounded" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
          <Timer className="w-4 h-4 mr-1" />
          <span>{timer}s</span>
        </div>

        {isFinished ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Test Completed!</h2>
            <p className="text-lg">Your Score: {score} / {shuffledQuestions.length}</p>
          </div>
        ) : (
          <>
            <p className="font-semibold mb-2">{currentQuestion.question}</p>
            {currentQuestion.image && (
              <img
                src={currentQuestion.image}
                alt="Question Illustration"
                className="mb-2 w-full h-40 object-contain rounded"
              />
            )}
            {currentQuestion.options.map((option: string, index: number) => (
              <button
                key={index}
                className={`w-full text-left border px-4 py-2 rounded mb-2 ${
                  selectedOption === option
                    ? isCorrectAnswer === null
                      ? 'bg-blue-500 text-white'
                      : isCorrectAnswer && option === currentQuestion.answer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : ''
                }`}
                onClick={() => setSelectedOption(option)}
                disabled={!!result}
              >
                {option}
              </button>
            ))}
            {result && (
              <div className="mb-2">
                <p className="font-semibold">{result}</p>
                {showExplanation && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2">
                    <strong>Correct Answer:</strong> {currentQuestion.answer}
                    <br />
                    {currentQuestion.explanation}
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsFinished(true)}
                className="text-red-500 hover:text-red-700 transition text-sm"
              >
                Finish Test
              </button>
              <button
                onClick={() => (result ? handleNextQuestion() : handleAnswer())}
                disabled={!!result && !selectedOption}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {result ? 'Next Question' : 'Submit Answer'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

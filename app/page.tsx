'use client';

import React, { useState, useEffect } from 'react';
import rawQuestions from './data/questions.json';

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  image?: string;
};

const questions: Question[] = rawQuestions;

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function DrivingTestApp() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...questions]));
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswer = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) setScore((prev) => prev + 1);
    setResult(isCorrect ? 'Correct!' : 'Incorrect!');
    setShowExplanation(true);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= shuffledQuestions.length) {
      setIsFinished(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setResult(null);
      setShowExplanation(false);
    }
  };

  const restartTest = () => {
    setShuffledQuestions(shuffleArray([...questions]));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setResult(null);
    setScore(0);
    setIsFinished(false);
    setShowExplanation(false);
  };

  if (!currentQuestion && !isFinished) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md sm:max-w-lg bg-white p-6 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Test Completed</h2>
          <p className="text-lg mb-4">
            You answered <span className="font-semibold">{score}</span> out of{' '}
            <span className="font-semibold">{shuffledQuestions.length}</span> questions correctly.
          </p>
          <button
            onClick={restartTest}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md sm:max-w-lg bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-2">NY Driving Test</h2>
        <div className="mb-2 text-sm text-gray-500">
          Question: {currentQuestionIndex + 1}/{shuffledQuestions.length}
        </div>

        {currentQuestion.image && (
          <img
            src={currentQuestion.image}
            alt="Question illustration"
            className="mb-4 w-full max-h-60 object-contain rounded-md"
          />
        )}

        <p className="mb-4 font-medium">{currentQuestion.question}</p>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => {
            let baseStyle = 'w-full text-left px-4 py-2 border rounded-lg';
            let selected = selectedOption === option;
            let correct = option === currentQuestion.answer;
            let colorClass = '';

            if (result && selected && correct) {
              colorClass = 'bg-green-500 text-white border-green-600';
            } else if (result && selected && !correct) {
              colorClass = 'bg-red-500 text-white border-red-600';
            } else if (selected) {
              colorClass = 'bg-blue-500 text-white';
            } else {
              colorClass = 'bg-white hover:bg-gray-100';
            }

            return (
              <button
                key={index}
                className={`${baseStyle} ${colorClass}`}
                onClick={() => setSelectedOption(option)}
                disabled={!!result}
              >
                {option}
              </button>
            );
          })}
        </div>
        {result && (
          <div className="mt-4">
            <p className="font-semibold">{result}</p>
            {showExplanation && (
              <div className="mt-2 text-sm text-gray-700 bg-gray-100 p-3 rounded-lg border">
                <p><strong>Correct Answer:</strong> {currentQuestion.answer}</p>
                <p className="mt-1">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        )}
        <div className="mt-4 flex gap-2 justify-end">
          {!result ? (
            <button
              onClick={handleAnswer}
              disabled={!selectedOption}
              className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Next Question
            </button>
          )}
          {!isFinished && (
            <button
              onClick={() => setIsFinished(true)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Finish Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

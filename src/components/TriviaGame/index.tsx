import { useState, useEffect, useMemo, useCallback } from "react";
import { QuestionData } from "../../utils/types";
import "./style.css";
import Question from "../Questions";
import ScoreBoard from "../ScoreBoard";

const TriviaGame = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10");
        const data = await response.json();

        if (data?.results && Array.isArray(data?.results)) {
          const formattedQuestions: QuestionData[] = data.results.map(
            (item: any) => ({
              question: item.question,
              correct_answer: item.correct_answer,
              incorrect_answers: item.incorrect_answers,
            })
          );
          setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error("Error fetching trivia questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    setShowCorrect(true);
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (selectedAnswer === questions[currentQuestionIndex]?.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      setShowCorrect(false);
      setSelectedAnswer(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1000);
  }, [selectedAnswer, currentQuestionIndex, questions]);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  if (!questions.length) {
    return <div className="loading">Loading...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return <ScoreBoard score={score} totalQuestions={questions.length} />;
  }

  return (
    <div className="trivia-container">
      <div className="question-info">
        <span>
          Question {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>
      <h1 className="trivia-title">Trivia Game</h1>
      <Question
        questionData={currentQuestion}
        selectedAnswer={selectedAnswer}
        showCorrect={showCorrect}
        onAnswerSelect={handleAnswerSelect}
      />
      <button
        className="next-button"
        onClick={handleNextQuestion}
        disabled={!selectedAnswer}
      >
        Next Question
      </button>
    </div>
  );
};

export default TriviaGame;

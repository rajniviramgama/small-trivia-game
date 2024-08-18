import React, { useMemo } from "react";

interface AnswerButtonProps {
  answer: string;
  correctAnswer: string;
  selectedAnswer: string | null;
  showCorrect: boolean;
  onAnswerSelect: (answer: string) => void;
}

const AnswerButton = ({
  answer,
  correctAnswer,
  selectedAnswer,
  showCorrect,
  onAnswerSelect,
}: AnswerButtonProps) => {
    
  const buttonStyle = useMemo(() => {
    if (showCorrect) {
      return answer === correctAnswer
        ? "correct"
        : selectedAnswer === answer
        ? "incorrect"
        : "";
    }
    return "";
  }, [answer, correctAnswer, selectedAnswer, showCorrect]);

  return (
    <button
      className={`answer-button ${buttonStyle}`}
      onClick={() => onAnswerSelect(answer)}
      disabled={showCorrect}
    >
      {answer}
    </button>
  );
};

export default AnswerButton;

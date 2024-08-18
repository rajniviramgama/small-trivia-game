import { useMemo } from "react";
import AnswerButton from "../AnswerButton";

interface QuestionProps {
  questionData: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  selectedAnswer: string | null;
  showCorrect: boolean;
  onAnswerSelect: (answer: string) => void;
}

const Question = ({
  questionData,
  selectedAnswer,
  showCorrect,
  onAnswerSelect,
}: QuestionProps) => {
  const answers = useMemo(
    () => [questionData?.correct_answer, ...questionData?.incorrect_answers],
    [questionData]
  );

  return (
    <div className="question-container">
      <h2 className="question-text">{questionData.question}</h2>
      <div className="answers-container">
        {answers?.map((answer) => (
          <AnswerButton
            key={answer}
            answer={answer}
            correctAnswer={questionData.correct_answer}
            selectedAnswer={selectedAnswer}
            showCorrect={showCorrect}
            onAnswerSelect={onAnswerSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;

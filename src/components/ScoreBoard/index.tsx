import "./style.css";

interface ScoreBoardProps {
  score: number;
  totalQuestions: number;
}

const ScoreBoard = ({ score, totalQuestions }: ScoreBoardProps) => {
  return (
    <>
      <div className="score-board">
        <h2>
          Your final score is {score} out of {totalQuestions}
        </h2>
        <p>Total Questions: {totalQuestions}</p>
        <p>Correct Answers: {score}</p>
        <p>Incorrect Answers: {totalQuestions - score}</p>
        <button onClick={() =>window?.location?.reload() }>
          Refresh
        </button>
      </div>
    </>
  );
};

export default ScoreBoard;

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
        <p className="score-board-correct">Correct Answers: {score}</p>
        <p className="score-board-incorrect">Incorrect Answers: {totalQuestions - score}</p>
        <button className="refresh-button" onClick={() =>window?.location?.reload() }>
          Refresh
        </button>
      </div>
    </>
  );
};

export default ScoreBoard;

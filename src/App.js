import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const ProgressBar = ({ id, onCompleteProgress }) => {
  const [status, setStatus] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prevStatus) => prevStatus + 1); // Use previous state
    }, 100);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (status >= 100) {
      onCompleteProgress(id);
    }
  }, [status]);

  return <progress value={status} max={100} className="progressBar"></progress>;
};

function App() {
  const [barsCount, setBarCount] = useState([]);

  const onClick = () => {
    const random = Date.now() % 1000;

    setBarCount([...barsCount, { statue: "NOT_STARTED", id: random }]);
  };

  const onCompleteProgress = (id) => {
    setBarCount(barsCount.filter((count) => count.id !== id));
  };
  return (
    <div className="App">
      <button onClick={() => setBarCount([])}>Reset progress bar</button>
      <button onClick={onClick}>Create progress bar</button>
      <div>
        qued progess bars: {barsCount.length - 5 > 0 ? barsCount.length - 5 : 0}
      </div>

      {barsCount.slice(0, 5).map((count) => (
        <ProgressBar
          key={count.id}
          id={count.id}
          onCompleteProgress={onCompleteProgress}
        />
      ))}
    </div>
  );
}

export default App;

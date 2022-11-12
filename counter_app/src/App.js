import './App.css';
import { useState } from "react";

function App() {
  const [Count, SetCount] = useState(0);
  const DecrementHandle = () => {
    SetCount(Count - 1);
  };
  const IncrementHandle = () => {
    SetCount(Count + 1);
  };
  return (
    <div className="App">
      <h1>Counter APP</h1>
      <div className='counter'>{Count}</div>
      <div className='buttons'>
        <button onClick={DecrementHandle} className ="button-3 decre">Decrement</button>
        <button onClick={IncrementHandle} className="button-3 incre">Increment</button>
      </div>
    </div>
  );
}

export default App;


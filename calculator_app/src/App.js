import { useReducer } from "react";
import "./App.css";
import Button from "./components/Button";
import History from "./components/History";
import ButtonsData from "./Data/ButtonJSON";
const HistoryData = [];
function reducer(state, { type, payload }) {
  switch (type) {
    case "digit_action":
      if (payload.value === "0" && state.currentOperand === "0") {
        return state;
      }
      if(payload.value === "." && state.currentOperand.includes(".")){
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}` + payload.value,
      };
    case "option_action":
      if (state.currentOperand && state.previousOperand) {
        return {
          ...state,
          currentOperand: calulate(state),
          previousOperand: null,
          operation: null,
          overwrite: true
        };
      }
      if(state.currentOperand == null){
        return state;
      }
      return {
        ...state,
        operation: payload.value,
        previousOperand: state.currentOperand,
        currentOperand: null,
      };
    case "digit_clear":
      return {};
    case "digit_delete":
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case "evalute_action":
      if (state.currentOperand && state.previousOperand) {
        return {
          ...state,
          currentOperand: calulate(state),
          previousOperand: null,
          operation: null,
          overwrite: true
        };
      } else {
        return state;
      }
    default:
      throw new Error();
  }
}

function calulate({ operation, currentOperand, previousOperand }) {
  let result;
  switch (operation) {
    case "+":
      result = parseInt(previousOperand) + parseInt(currentOperand);
      HistoryData.push({
        values: `${previousOperand} + ${currentOperand}`,
        Result: result,
      });
      break;
    case "-":
      result = parseInt(previousOperand) - parseInt(currentOperand);
      HistoryData.push({
        values: `${previousOperand} - ${currentOperand}`,
        Result: result,
      });
      break;
    case "*":
      result = parseInt(previousOperand) * parseInt(currentOperand);
      HistoryData.push({
        values: `${previousOperand} * ${currentOperand}`,
        Result: result,
      });
      break;
    case "÷":
      result = parseInt(previousOperand) / parseInt(currentOperand);
      HistoryData.push({
        values: `${previousOperand} ÷ ${currentOperand}`,
        Result: result,
      });
      break;
    default:
      break;
  }

  return result;
}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="App">
    <div className="sub-content">
      <div className="result-content">
          <p>{previousOperand} {operation}</p> 
          <p>{currentOperand}</p> 
      </div>
      <div className="btn-container">
      {ButtonsData.map((item) => {
        return <Button key={item.id} Data={item} dispatch={dispatch} />;
      })}
      </div>
    </div>
    </div>
  );
}

export default App;

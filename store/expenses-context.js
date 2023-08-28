import { createContext, useReducer,useState } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date, status}) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date,status }) => {},
  setactive:(data)=>{},
  setall:(data)=>{},
  setcompleted:(data)=>{},
  active:true,
  completed:true,
  all:true
});

function expensesReducer(state, action) {

  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return action.payload;

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [Completed, setCompleted] = useState(false);
  const [Active, setActive] = useState(false);
  const [All, setALL] = useState(false);
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  function complete(data) {
     setCompleted(data)
  }
  function active(data) {
    setActive(data)
  }
  function all(data) {
   setALL(data)
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setactive:active,
    setall:all,
    setcompleted:complete,
    active:Active,
    completed:Completed,
    all:All
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;

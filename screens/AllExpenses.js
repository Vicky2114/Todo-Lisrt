import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useEffect } from "react";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  /*const recentExpenses=expensesCtx.expenses.filter((expense)=>{
        return expense.status === "test2";
        })*/

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    if (expensesCtx.active && !expensesCtx.completed && !expensesCtx.all) {
      return expense.status === "test";
    }
    if (expensesCtx.completed && !expensesCtx.active && !expensesCtx.all) {
      return expense.status === "test2";
    }
    return expense;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Total List"
      fallbackText="No registered todo list found"
    />
  );
}

export default AllExpenses;

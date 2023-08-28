
import { Text } from "react-native"
import ExpensesOutput from "../components/Expenses/ExpensesOutput"
import { useContext, useEffect,useState } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays, getFormattedDate } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/laodingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
   
   const [isFetching,setIsFetching]=useState(true)
   const [error,setError]=useState();
  const expensesCtx= useContext(ExpensesContext);


  useEffect(()=>{
    async function getExpenses(){
      setIsFetching(true);
      try{
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      }catch(error){
        setError('Could not fetch expenses!');
      }
    setIsFetching(false)
    }
    
    getExpenses();
  },[])
    
  function errorHandler(){
    setError(null)
  }

     
   if(error&&!isFetching ){
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
   }
  if(isFetching){
    return <LoadingOverlay />
  }


  const recentExpenses=expensesCtx.expenses.filter((expense)=>{
  return expense.status === "test2";
  })

   return <ExpensesOutput 
   expenses={recentExpenses} 
    fallbackText="No Completed List "  
    expensesPeriod="Completed List" />
}

export default RecentExpenses
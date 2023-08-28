
import { Text } from "react-native"
import ExpensesOutput from "../components/Expenses/ExpensesOutput"
import { useContext, useEffect,useState } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays, getFormattedDate } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/laodingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function TodayList() {
   
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
  const today=new Date();
  const date1DaysAgo=getFormattedDate(today)
        //today's date logic
  const expensedate=getFormattedDate(expense.date);
  return expensedate === date1DaysAgo ;
  })

   return <ExpensesOutput 
   expenses={recentExpenses} 
    fallbackText="No registered Today list"  
    expensesPeriod="Todays Todo's- work" />
}

export default TodayList
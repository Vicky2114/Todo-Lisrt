import axios from 'axios';


const Backend_Url='https://expenses-dc928-default-rtdb.firebaseio.com'
export async  function storeExpense(expenseData){
    const response=await axios.post(Backend_Url+'/expenses.json',expenseData)
    const id =response.data.name;
    return id;
}


export async function fetchExpenses(){
    const response= await axios.get(Backend_Url+'/expenses.json')
    

    const expenses =[];
    for(const key in response.data){
        const expenseObj={
            id:key,
            amount:response.data[key].amount,
            date:new Date(response.data[key].date),
            description:response.data[key].description,
            status:response.data[key].status,

        }
        expenses.push(expenseObj);
    }
    return expenses
}

export  function updateExpenses(id,expenseData){
    return axios.put(Backend_Url + `/expenses/${id}.json`,expenseData);


}
export  function deleteExpenses(id){
    return axios.delete(Backend_Url + `/expenses/${id}.json`,)
}
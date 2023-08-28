import { View,Text,StyleSheet } from "react-native"
import {GlobalStyles} from '../../constants/styles'
import IconButton from "../UI/IconButton";

function ExpensesSummary({expenses,periodName}) {

    let completed=0;
    let pending=0;
  

    for (let index = 0; index < expenses.length; index++) {
        if(expenses[index].status==="test2"){
            completed++;
        }else{
            pending++;
        }
        
    }

    return <View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <IconButton color="green" size={28} icon="checkmark-circle" />
        <Text style={styles.period}>{completed}</Text>
<IconButton color="red" size={28} icon="timer" />
<Text style={styles.period}>{pending}</Text>
    </View>

}
export default ExpensesSummary

const styles=StyleSheet.create({
   container:{
    padding:4,
    backgroundColor:GlobalStyles.colors.primary50,
    borderRadius:6,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

   },
   period:{

    fontSize:17,
    color:GlobalStyles.colors.primary400
   },
   sum:{
    fontSize:16,
    fontWeight:'bold',
    color:GlobalStyles.colors.primary500
   }
})
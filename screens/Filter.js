import { Switch, Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";

const thumbColorOn = Platform.OS === "android" ? "#0cd1e8" : "#f3f3f3";
const thumbColorOff = Platform.OS === "android" ? "#f04141" : "#f3f3f3";
const trackColorOn = Platform.OS === "android" ? "#98e7f0" : "#0cd1e8";
const trackColorOff = Platform.OS === "android" ? "#f3adad" : "#f04141";

function Filter() {
 
    const expensesCtx= useContext(ExpensesContext)


  const [completed, setCompleted] = useState(true);
  const [active, setActive] = useState(true);
  const [all, setALL] = useState(true);
  const toggleSwitchCompleted = () => {
    setCompleted((oldValue) => !oldValue);
    expensesCtx.setcompleted(completed);
  };
  const toggleSwitchActive = () => {
    setActive((oldValue) => !oldValue);
    expensesCtx.setactive(active);
  };
  const toggleSwitchAll = () => {
    setALL((oldValue) => !oldValue);
    expensesCtx.setall(all)
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.switchItem}>
          <Text style={styles.text}>Completed List</Text>
          <Switch
            onValueChange={toggleSwitchCompleted}
            value={expensesCtx.completed}
            thumbColor={expensesCtx.completed ? thumbColorOn : thumbColorOff}
            trackColor={{ false: trackColorOff, true: trackColorOn }}
            ios_backgroundColor={trackColorOff}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.text}> Active List</Text>
          <Switch
            onValueChange={toggleSwitchActive}
            value={expensesCtx.active}
            thumbColor={expensesCtx.active ? thumbColorOn : thumbColorOff}
            trackColor={{ false: trackColorOff, true: trackColorOn }}
            ios_backgroundColor={trackColorOff}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.text}>All List</Text>
          <Switch
            onValueChange={toggleSwitchAll}
            value={expensesCtx.all}
            thumbColor={expensesCtx.all ? thumbColorOn : thumbColorOff}
            trackColor={{ false: trackColorOff, true: trackColorOn }}
            ios_backgroundColor={trackColorOff}
          />
        </View>
      </View>
    </>
  );
}

export default Filter;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  switchItem: {
    padding: 12,
 
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
   
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
});

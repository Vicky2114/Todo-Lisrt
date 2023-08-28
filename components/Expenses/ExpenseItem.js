import { Text, Pressable, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import IconButton from "../UI/IconButton";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});
function ExpenseItem({ id, description, amount, date, status }) {
const myTimeout = setTimeout(scheduleNotificationHandler,1000000);
    function scheduleNotificationHandler() {
        if(status==="test" && date === getFormattedDate(new Date())){
            Notifications.scheduleNotificationAsync(
              {
                content: {
                  title: amount,
                  body: description,
                },
                trigger: {
                  seconds: 30,
                },
              },
            );
        }
    }


  const navigation = useNavigation();
  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.expenseItem]}>
        <View style={styles.cont}>
          <Text style={[styles.textBase, styles.description]}>{amount}</Text>

          <Text style={styles.textBase}>{description}</Text>
        </View>
        <View style={styles.amountContainer}>
          {status === "test2" ? (
            <IconButton color="green" size={30} icon="checkmark-circle" />
          ) : (
            <IconButton color="red" size={30} icon="timer" />
          )}
          <Text style={styles.amount}>{getFormattedDate(date)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  cont: {
    width: 196,
  },
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});

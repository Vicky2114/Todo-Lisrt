import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { RadioButtonItem, RadioButtonGroup } from "expo-radio-button";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

  
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount : "",
      isValid: true,
    },

    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    status:{
        value:defaultValues ? defaultValues.status : "",
        isValid:true
    }
  });
 
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      status: inputs.status.value,
    };

    const amountIsValid = expenseData.amount.trim().length > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert('Invalid Input','Please check your input values')
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          status: {
            value: curInputs.status.value,
            isValid: true,
          },
        };
      });

      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="title"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize:
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <View style={styles.radio}>
        <RadioButtonGroup
          containerStyle={{ marginBottom: 10 }}
         selected={inputs.status.value}
          onSelected={(value) => {
            
            setInputs((curInputs) => {
                return {
                  ...curInputs,
                  ["status"]: { value: value, isValid: true },
                };
              });
          }}
          radioBackground={inputs.status.value === "test2" ? "green" : "red"}
        >
          <RadioButtonItem
            value="test2"
            label={
              <Text style={{ color: "green", fontSize: 18 }}>
                Completed Task
              </Text>
            }
            style={styles.radioitem}
          />
          <RadioButtonItem
            value="test"
            label={
              <Text style={{ color: "red", fontSize: 18 }}>Pending Task</Text>
            }
            style={styles.radioitem}
          />
        </RadioButtonGroup>
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entred data
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.buttons} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  form: {
    marginTop: 40,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 80,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  radio: {
    marginTop: 20,
  },
  radioitem: {
    margin: 10,
  },
});

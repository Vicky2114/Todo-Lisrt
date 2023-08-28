import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet,View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";

import { BlurView } from "expo-blur";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import UpcommingList from "./screens/UpcommingList";
import TodayList from "./screens/TodayList";
import Filter from "./screens/Filter";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <>
          <View style={{flexDirection:'row'}} >
          <IconButton
            icon="filter"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("filter");
            }}
          />
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
          </View>
          </>
        ),
      })}
      shifting={true}
    >
      <BottomTabs.Screen
        name="Completed List"
        component={RecentExpenses}
        options={{
          title: "Completed List",
          tabBarLabel: "CompletedList",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={size} color={color} />
          ),
          tabBarBackground: () => (
            <BlurView
              tint="dark"
              intensity={30}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="TodayList"
        component={TodayList}
        options={{
          title: "Today List",
          tabBarLabel: "TodayList",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="today" size={size} color={color} />
          ),
          tabBarBackground: () => (
            <BlurView
              tint="dark"
              intensity={30}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="TodoList"
        component={AllExpenses}
        options={{
          title: "Todo List",
          tabBarLabel: "TodoList",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          tabBarBackground: () => (
            <BlurView
              tint="dark"
              intensity={30}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="UpcommingList"
        component={UpcommingList}
        options={{
          title: "Upcoming List",
          tabBarLabel: "UpcommingList",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          tabBarBackground: () => (
            <BlurView
              tint="dark"
              intensity={30}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenses}
              options={{
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="filter"
              component={Filter}
              options={{
                presentation: "card",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

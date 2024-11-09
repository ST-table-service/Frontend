import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import MainTabs from "./MainTabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
export default function Index() {
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

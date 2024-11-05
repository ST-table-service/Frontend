import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./Landing";
import Login from "./Login";

const Stack = createNativeStackNavigator();
export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

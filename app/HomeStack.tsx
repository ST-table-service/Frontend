import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Popular from "./Popular";
import Bobby from "./Bobby";
const Stack = createNativeStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Bobby">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Popular"
        component={Popular}
        options={{
          headerShown: false,
          //   header: (props) => <CustomHeader {...props} />, // Popular 화면에서는 CustomHeader 사용
        }}
      />
      <Stack.Screen
        name="Bobby"
        component={Bobby}
        options={{
          headerShown: false,
          //   header: (props) => <CustomHeader {...props} />, // Popular 화면에서는 CustomHeader 사용
        }}
      />
    </Stack.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Popular from "./Popular";
import Bobby from "./Bobby";
import Coupon from "./Coupon";
import MyPage from "./MyPage";
import Cart from "./Cart";
import MyCart from "./MyCart";
import RestaurantHeader from "./RestaurantHeader";
import Header from "./Header";
import { Image, Text, TouchableOpacity } from "react-native";
import BobbyStack from "./BobbyStack";
const Stack = createNativeStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="Popular"
        component={Popular}
        options={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleAlign: "center",
          headerTitle: () => <Text style={{ fontSize: 24 }}>인기메뉴</Text>,
        }}
      />
      <Stack.Screen
        name="BobbyStack"
        component={BobbyStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          //   header: (props) => <CustomHeader {...props} />, // Popular 화면에서는 CustomHeader 사용
        }}
      />
      <Stack.Screen
        name="Coupon"
        component={Coupon}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MyCart"
        component={MyCart}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

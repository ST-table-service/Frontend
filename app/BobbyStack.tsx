import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bobby from "./Bobby";
import MyCart from "./MyCart";
import { Image, Text, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

export default function BobbyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bobby"
        component={Bobby}
        options={({ navigation }) => ({
          headerStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
          headerTitle: () => <Text style={{ fontSize: 24 }}>바비든든</Text>,
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.goBack()}>
          //     <Image
          //       source={require("../assets/images/delete.png")}
          //       style={{ width: 30, height: 30 }}
          //       resizeMode="stretch"
          //     />
          //   </TouchableOpacity>
          // ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
              <Image
                source={require("../assets/images/cartIcon.png")}
                style={{ width: 30, height: 30 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MyCart"
        component={MyCart}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

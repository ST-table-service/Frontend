import Button from "./Button";
import styled from "styled-components/native";
import Logo from "./Logo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type LandingProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function Landing({ navigation }: LandingProps) {
  const MainContainer = styled.SafeAreaView`
    flex: 1;
    background-color: white;
    justify-content: center;
    align-items: center;
    gap: 15px;
  `;

  const Container = styled.View``;

  const StTable = styled.Image`
    width: 200px;
    height: 200px;
  `;

  const logoImage = require("../assets/images/sttable.png");
  return (
    <MainContainer>
      <Logo />
      <StTable source={logoImage} resizeMode={"contain"} />
      <Button title="식사하러 가기" navigation={navigation} screen="Login" />
    </MainContainer>
  );
}

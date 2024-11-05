import Logo from "./Logo";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
export default function Index() {
  const Button = styled.TouchableOpacity`
    align-items: center;
    background-color: #ff5643;
    border-radius: 20px;
    padding: 22px 80px; /* 수직 패딩을 22px로 설정하고 수평 패딩은 0으로 설정 */
    /* width: 60px; */
  `;
  const ButtonText = styled.Text`
    color: #ffffff;
    font-size: 16px;
  `;

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
      <Button onPress={() => {}}>
        <ButtonText>{"식사하러 가기"}</ButtonText>
      </Button>
    </MainContainer>
  );
}

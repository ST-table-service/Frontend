import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList } from "./types";

type ButtonProps = {
  title: string;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  screen: keyof RootStackParamList;
  buttonColor?: string;
};

interface CustomButtonProps extends TouchableOpacityProps {
  bgColor?: string; // bgColor 속성을 선택적으로 정의
}
export default function Button({
  title,
  navigation,
  screen,
  buttonColor,
}: ButtonProps) {
  const Button = styled.TouchableOpacity<CustomButtonProps>`
    align-items: center;
    background-color: ${(props) => props.bgColor || "#ff5643"};
    border-radius: 20px;
    padding: 22px 80px; /* 수직 패딩을 22px로 설정하고 수평 패딩은 0으로 설정 */
    /* min-width: 20px; */
    /* width: 60px; */
  `;
  const ButtonText = styled.Text`
    color: #ffffff;
    font-size: 16px;
  `;
  return (
    <Button
      bgColor={buttonColor}
      onPress={() => {
        navigation.navigate(screen);
      }}
    >
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}

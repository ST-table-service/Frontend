import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList } from "./types";

type ButtonProps = {
  title: string;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
  screen: keyof RootStackParamList;
  params?: any;
  buttonColor?: string;
  onPress?: () => void; // 추가된 onPress prop
};

interface CustomButtonProps extends TouchableOpacityProps {
  bgColor?: string;
}

export default function Button({
  title,
  navigation,
  screen,
  params,
  buttonColor,
  onPress,
}: ButtonProps) {
  const Button = styled.TouchableOpacity<CustomButtonProps>`
    align-items: center;
    background-color: ${(props) => props.bgColor || "#ff5643"};
    border-radius: 20px;
    padding: 22px 80px;
  `;

  const ButtonText = styled.Text`
    color: #ffffff;
    font-size: 16px;
  `;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigation) {
      navigation.navigate(screen, params);
    }
  };

  return (
    <Button bgColor={buttonColor} onPress={handlePress}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}

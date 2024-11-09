import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { RootStackParamList } from "./types";

interface IconContainerProps {
  imageUrl: any;
  text: string;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  screen: keyof RootStackParamList;
}

export default function IconContainer({
  imageUrl,
  text,
  navigation,
  screen,
}: IconContainerProps) {
  const IconText = styled.Text`
    text-align: center;
    font-size: 14px;
  `;
  const IconContainer = styled.TouchableOpacity`
    gap: 10px;
  `;
  const Icon = styled.Image`
    width: 55px;
    height: 55px;
  `;

  return (
    <IconContainer
      onPress={() => {
        navigation.navigate(screen);
      }}
    >
      <Icon source={imageUrl} resizeMode="contain" />
      <IconText>{text}</IconText>
    </IconContainer>
  );
}

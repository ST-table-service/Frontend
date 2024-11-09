import styled from "styled-components/native";

interface IconContainerProps {
  imageUrl: any;
  text: string;
}

export default function IconContainer({ imageUrl, text }: IconContainerProps) {
  const IconText = styled.Text`
    text-align: center;
    font-size: 14px;
  `;
  const IconContainer = styled.View`
    gap: 10px;
  `;
  const Icon = styled.Image`
    width: 55px;
    height: 55px;
  `;

  return (
    <IconContainer>
      <Icon source={imageUrl} resizeMode="contain" />
      <IconText>{text}</IconText>
    </IconContainer>
  );
}

import { TextProps, View, ViewProps } from "react-native";
import styled from "styled-components/native";

interface NoticeItemProps {
  date: string;
  restaurant: string;
  content: String;
  image: any;
}

export default function NoticeItem({
  date,
  restaurant,
  content,
  image,
}: NoticeItemProps) {
  return (
    <NoticeItemContainer>
      <NoticeImage
        source={image}
        resizeMode={"stretch"}
        width={56}
        height={56}
      />
      <RestaurantCol>
        <RestaurantRow1>
          <NoticeDate>{date}</NoticeDate>
          <RestaurantName>{restaurant}</RestaurantName>
        </RestaurantRow1>
        <TextStyled fontSize={16}>{content}</TextStyled>
      </RestaurantCol>
    </NoticeItemContainer>
  );
}
interface CustomRowProps extends ViewProps {
  gap?: string;
}
const Row = styled.View<CustomRowProps>`
  flex-direction: row;
  gap: ${(props) => props.gap || "0px"};
`;

interface CustomTextProps extends TextProps {
  fontSize?: number;
  bold?: boolean;
}

const TextStyled = styled.Text<CustomTextProps>`
  font-size: ${(props) => props.fontSize || 14}px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;
const RestaurantRow1 = styled(Row)`
  justify-content: flex-end;
  align-items: center;
`;
const RestaurantName = styled.Text`
  background-color: #d8d8d8;
  border-radius: 50px;
  padding: 4px 6px;
  font-size: 8px;
  text-align: center;
`;

const NoticeItemContainer = styled(Row)`
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-color: #000000;
  border-radius: 20px;
  border-width: 2px;
  padding: 10px;
  margin: 10px 20px 20px;
`;

const RestaurantCol = styled.View`
  flex: 1;
  height: 100%;
  /* justify-content: space-around; */
  gap: 10px;
  padding-left: 5px;
`;
const TextSoldout = styled.Text`
  font-size: 11px;
  color: #959595;
`;
const NoticeImage = styled.Image`
  width: 70px;
  height: 70px;
`;
const NoticeDate = styled.Text`
  color: #959595;
  font-size: 13px;
`;

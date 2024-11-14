import { useState } from "react";
import { Text, TextProps, ViewProps, Image } from "react-native";
import styled from "styled-components/native";

interface PopProps {
  store_name?: string;
  menu_images: string;
  menu_name: string;
  description: string;
  price: number;
  popular?: boolean;
}

export function PopularMenuItem({
  store_name,
  menu_images,
  menu_name,
  description,
  price,
  popular = true,
}: PopProps) {
  const [isPopular] = useState<boolean>(popular);

  // 가격을 한국어 형식으로 포맷팅
  const formattedPrice = price.toLocaleString() + "원";

  return (
    <Container>
      {store_name && <Restaurant>{store_name}</Restaurant>}
      <MenuContainer isRest={store_name ? true : false}>
        {store_name ? (
          <MenuImage1
            source={
              menu_images.startsWith("http")
                ? { uri: menu_images }
                : require("../assets/images/PopMenuItem1.png")
            }
            resizeMode={"stretch"}
          />
        ) : (
          <MenuImage2
            source={
              menu_images.startsWith("http")
                ? { uri: menu_images }
                : require("../assets/images/PopMenuItem1.png")
            }
            resizeMode={"stretch"}
          />
        )}
        <MenuDetails>
          <MenuRow isRest={store_name ? true : false}>
            <Row>
              <MenuItemText>{menu_name}</MenuItemText>
              {isPopular && <Text>✨</Text>}
            </Row>
            <PriceText>{formattedPrice}</PriceText>
          </MenuRow>
          <MenuDescription isRest={store_name ? true : false}>
            {description}
          </MenuDescription>
        </MenuDetails>
      </MenuContainer>
    </Container>
  );
}

const Row = styled.View`
  flex-direction: row;
`;

const Container = styled.View`
  margin: 0 20px 10px 20px;
`;

const Restaurant = styled.Text`
  font-size: 20px;
  margin-bottom: 6px;
  margin-left: 12px;
`;

const MenuContainer = styled.View<CustomViewProps>`
  flex-direction: row;
  align-items: center;
  border-color: #000000;
  border-radius: 20px;
  border-width: 1px;
  margin-bottom: 0 8px 20px 8px;
  padding: ${(props) => (props.isRest ? "10px 15px" : "20px")};
`;

const MenuImage1 = styled.Image`
  border-radius: 5px;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const MenuImage2 = styled.Image`
  border-radius: 5px;
  width: 70px;
  height: 70px;
  margin-right: 10px;
`;

const MenuDetails = styled.View`
  flex: 1;
  margin-right: 4px;
`;

interface CustomViewProps extends ViewProps {
  isRest?: boolean;
}
const MenuRow = styled.View<CustomViewProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: ${(props) => (props.isRest ? "0" : "10px")};
`;

const MenuItemText = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
`;

const MenuDescription = styled.Text<CustomTextProps>`
  color: #949494;
  font-size: ${(props) => (props.isRest ? "14px" : "16px")};
`;

interface CustomTextProps extends TextProps {
  isRest?: boolean;
}
const PriceText = styled.Text<CustomTextProps>`
  font-size: 18px;
`;

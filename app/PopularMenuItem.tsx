import { useState } from "react";
import { Text, TextProps, ViewProps } from "react-native";
import styled from "styled-components/native";
interface PopProps {
  restaurant?: string;
  image: any;
  title: string;
  description: string;
  price: string;
  popular?: boolean;
}

export function PopularMenuItem({
  restaurant,
  image,
  title,
  description,
  price,
  popular,
}: PopProps) {
  const [isPopular, setIsPopular] = useState<boolean>(popular || false);

  return (
    <Container>
      {restaurant && <Restaurant>{restaurant}</Restaurant>}
      <MenuContainer isRest={restaurant ? true : false}>
        {restaurant ? (
          <MenuImage1 source={image} resizeMode={"stretch"} />
        ) : (
          <MenuImage2 source={image} resizeMode={"stretch"} />
        )}
        <MenuDetails>
          <MenuRow isRest={restaurant ? true : false}>
            <Row>
              <MenuItemText>{title}</MenuItemText>
              {isPopular && <Text>✨</Text>}
            </Row>
            <PriceText>{price}</PriceText>
          </MenuRow>
          <MenuDescription isRest={restaurant ? true : false}>
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

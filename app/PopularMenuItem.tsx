import React from "react";
import styled from "styled-components/native";
interface PopProps {
  restaurant: string;
  image: any;
  title: string;
  description: string;
  price: string;
}

export function PopularMenuItem({
  restaurant,
  image,
  title,
  description,
  price,
}: PopProps) {
  return (
    <Container>
      <Restaurant>{restaurant}</Restaurant>
      <MenuContainer>
        <MenuImage source={image} resizeMode={"stretch"} />
        <MenuDetails>
          <MenuRow>
            <MenuItemText>{title}</MenuItemText>
            <PriceText>{price}</PriceText>
          </MenuRow>
          <MenuDescription>{description}</MenuDescription>
        </MenuDetails>
      </MenuContainer>
    </Container>
  );
}

const Container = styled.View`
  margin: 0 20px 10px 20px;
`;

const Restaurant = styled.Text`
  font-size: 20px;
  margin-bottom: 6px;
  margin-left: 12px;
`;

const MenuContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: #000000;
  border-radius: 20px;
  border-width: 1px;
  padding: 10px 15px;
  margin-bottom: 0 8px 20px 8px;
`;

const MenuImage = styled.Image`
  border-radius: 5px;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const MenuDetails = styled.View`
  flex: 1;
  margin-right: 4px;
`;
const MenuRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const MenuItemText = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
`;

const MenuDescription = styled.Text`
  color: #949494;
  font-size: 14px;
`;

const PriceText = styled.Text`
  font-size: 18px;
`;

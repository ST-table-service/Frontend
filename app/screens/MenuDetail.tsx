// screens/MenuDetail.tsx
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import styled from "styled-components/native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, MenuOption, CartItem } from "../types";
import { useCart } from "../contexts/CartContext";

type MenuDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, // ParamList를 정의한 타입을 사용
  "MenuDetail"
>;

type MenuDetailScreenRouteProp = RouteProp<RootStackParamList, "MenuDetail">;

type Props = {
  navigation: MenuDetailScreenNavigationProp;
  route: MenuDetailScreenRouteProp;
};

export default function MenuDetail({ navigation, route }: Props) {
  const {
    menuId,
    title,
    price,
    description,
    image,
    options = [],
  } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { addToCart } = useCart();

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: menuId,
      title,
      price,
      description,
      image,
      quantity,
      selectedOptions,
    };
    addToCart(cartItem);

    Alert.alert("장바구니에 추가되었습니다", undefined, [
      {
        text: "장바구니로 이동",
        onPress: () => navigation.navigate("Cart"),
      },
      {
        text: "계속 쇼핑하기",
        style: "cancel",
      },
    ]);
  };

  return (
    <Container>
      <ScrollContainer>
        <MenuContainer>
          <MenuImage
            source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
            resizeMode="stretch"
          />
          <MenuTextContainer>
            <MenuNameText>{title}</MenuNameText>
            <MenuPriceText>{`${price.toLocaleString()}원`}</MenuPriceText>
          </MenuTextContainer>
        </MenuContainer>

        <OptionsText>메뉴 옵션</OptionsText>
        {options.length > 0 && (
          <OptionContainer>
            {options.map((option) => (
              <OptionItemContainer
                key={option.id}
                isSelected={selectedOptions.includes(option.id)}
                onPress={() => handleOptionToggle(option.id)}
              >
                <OptionImage
                  source={
                    selectedOptions.includes(option.id)
                      ? require("../../assets/images/checked.png") // 선택된 경우 체크 아이콘
                      : require("../../assets/images/unchecked.png")
                  } // 선택되지 않은 경우 빈 체크 아이콘
                />
                <View>
                  <OptionText>{option.name}</OptionText>
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  >{`(+${option.price.toLocaleString()}원)`}</Text>
                </View>
              </OptionItemContainer>
            ))}
          </OptionContainer>
        )}

        {/* 수량 선택 */}
        <QuantityText>수량</QuantityText>
        <QuantityContainer>
          <QuantityButton onPress={() => handleQuantityChange(-1)}>
            <Text style={{ fontSize: 16 }}>{"-"}</Text>
          </QuantityButton>
          <QuantityTextBox>
            <Text style={{ fontSize: 20 }}>{quantity}</Text>
          </QuantityTextBox>
          <QuantityButton onPress={() => handleQuantityChange(1)}>
            <Text style={{ fontSize: 16 }}>{"+"}</Text>
          </QuantityButton>
        </QuantityContainer>

        {/* <TotalSection>
          <TotalText>총 금액</TotalText>
          <TotalAmount>
            {`${(
              price * quantity +
              selectedOptions.reduce(
                (sum, optionId) =>
                  sum + (options.find((o) => o.id === optionId)?.price || 0),
                0
              )
            ).toLocaleString()}원`}
          </TotalAmount>
        </TotalSection> */}
      </ScrollContainer>

      <ActionContainer>
        <ActionButton onPress={handleAddToCart}>
          <ActionButtonText>장바구니에 담기</ActionButtonText>
        </ActionButton>
      </ActionContainer>
    </Container>
  );
}

// 스타일 컴포넌트들...

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding-top: 15px;
  margin: 0 20px;
`;

const MenuContainer = styled.View`
  flex-direction: row;
  gap: 80px;
  /* justify-content: space-between; */
  margin: 60px 0;
  /* margin-horizontal: 9px; */
`;

const MenuImage = styled.Image`
  border-radius: 20px;
  width: 200px;
  height: 170px;
  flex: 1;
`;

const MenuTextContainer = styled.View`
  gap: 15px;
  /* align-items: flex-end; */
  /* align-items: center; */
  flex: 1;
`;

const MenuNameText = styled.Text`
  font-size: 24px;
`;

const MenuPriceText = styled.Text`
  font-size: 22px;
`;

const OptionsText = styled.Text`
  font-size: 24px;
  margin-bottom: 36px;
  /* text-align: center; */
`;

const OptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  margin-bottom: 83px;
  margin: 0 9px 60px 9px;
  gap: 15px;
`;
const OptionItemContainer = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  gap: 10px;
`;

const OptionImage = styled.Image`
  width: 18px;
  height: 24px;
`;

const OptionText = styled.Text`
  font-size: 20px;
`;

const QuantityText = styled.Text`
  font-size: 24px;
  margin-bottom: 15px;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 74px;
`;

const QuantityButton = styled.TouchableOpacity`
  width: 45px;
  background-color: #d9d9d9;
  border-width: 1px;
  padding: 14px 0;
  align-items: center;
  justify-content: center;
`;

const QuantityTextBox = styled.View`
  width: 45px;
  align-items: center;
  border-width: 1px;
  padding: 14px 0;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

interface ActionButtonProps {
  primary?: boolean; // optional prop
}
const ActionButton = styled.TouchableOpacity<ActionButtonProps>`
  align-items: center;
  border-radius: 15px;
  padding: 15px;
  background-color: ${(props) => (props.primary ? "#435FFF" : "#FF5643")};
`;

const ActionButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`;

const DeleteButton = styled.TouchableOpacity``;

const RestaurantName = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

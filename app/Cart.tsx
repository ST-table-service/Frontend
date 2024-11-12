import React, { useState } from "react";
import styled from "styled-components/native";
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  View,
  Alert,
} from "react-native";

// Option 타입 정의
type OptionType = "extra" | "rice" | "noodle";

function Cart() {
  const [quantity, setQuantity] = useState(1);

  const [options, setOptions] = useState<{ [key in OptionType]: boolean }>({
    extra: false,
    rice: false,
    noodle: false,
  });

  const handleOptionPress = (option: OptionType): void => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  // handleQuantityChange 함수에 타입 지정
  const handleQuantityChange = (change: number): void => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleOrder = () => {
    Alert.alert(
      "주문 완료",
      `주문한 메뉴: 삼겹덮밥, 수량: ${quantity}\n옵션: ${JSON.stringify(
        options
      )}`
    );
  };

  return (
    <Container>
      <ScrollContainer>
        {/* 메뉴 사진 및 이름 */}
        <MenuContainer>
          <MenuImage
            source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
            resizeMode="stretch"
          />
          <MenuTextContainer>
            <MenuNameText>{"삼겹덮밥"}</MenuNameText>
            <MenuPriceText>{"3,500원"}</MenuPriceText>
          </MenuTextContainer>
        </MenuContainer>
        {/* 옵션 선택 */}
        <OptionsText>{"메뉴 옵션"}</OptionsText>
        <OptionContainer>
          <OptionItemContainer>
            <OptionImage source={{ uri: "https://i.imgur.com/1tMFzp8.png" }} />
            <OptionText
              onPress={() => handleOptionPress("extra")}
              style={{ color: options.extra ? "#000" : "#949494" }}
            >
              {"곱빼기"}
            </OptionText>
          </OptionItemContainer>
          <OptionItemContainer>
            <OptionImage source={{ uri: "https://i.imgur.com/1tMFzp8.png" }} />
            <OptionText
              onPress={() => handleOptionPress("rice")}
              style={{ color: options.rice ? "#000" : "#949494" }}
            >
              {"밥 추가"}
            </OptionText>
          </OptionItemContainer>
          <OptionItemContainer>
            <OptionImage source={{ uri: "https://i.imgur.com/1tMFzp8.png" }} />
            <OptionText
              onPress={() => handleOptionPress("noodle")}
              style={{ color: options.noodle ? "#949494" : "#000" }}
            >
              {"면 추가"}
            </OptionText>
          </OptionItemContainer>
        </OptionContainer>
        {/* 수량 선택 */}
        <QuantityText>{"수량"}</QuantityText>
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
        <ActionContainer>
          <ActionButton primary onPress={handleOrder}>
            <ActionText>{"추가주문"}</ActionText>
          </ActionButton>
          <ActionButton onPress={handleOrder}>
            <ActionText>{"주문완료"}</ActionText>
          </ActionButton>
        </ActionContainer>
      </ScrollContainer>
    </Container>
  );
}

export default Cart;
// Container components
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

const ScrollContainer = styled(ScrollView)`
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

const MenuImage = styled(Image)`
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
  margin: 0 9px 80px 9px;
  gap: 15px;
`;
const OptionItemContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const OptionImage = styled(Image)`
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
  width: 120px;
  align-items: center;
  border-radius: 20px;
  border-width: 1px;
  padding: 15px 0;
  margin-right: 26px;
  background-color: ${(props) => (props.primary ? "#435FFF" : "#D9D9D9")};
`;

const ActionText = styled.Text`
  font-size: 20px;
`;

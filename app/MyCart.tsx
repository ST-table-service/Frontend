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
import plusIcon from "../assets/images/plus.png";
import trashIcon from "../assets/images/delete.png"; // 삭제 아이콘 추가

function MyCart() {
  const [menuItems, setMenuItems] = useState([
    { name: "삼겹덮밥", price: 3500, quantity: 1 },
  ]);

  // 수량 조절 함수
  const handleQuantityChange = (index: number, change: number): void => {
    setMenuItems((prev) => {
      const newItems = [...prev];
      const newQuantity = Math.max(1, newItems[index].quantity + change);
      newItems[index].quantity = newQuantity;
      return newItems;
    });
  };

  // 메뉴 추가 함수
  const handleAddMenu = (): void => {
    const newItem = { name: "추가 메뉴", price: 4000, quantity: 1 }; // 새 메뉴 항목
    setMenuItems((prev) => [...prev, newItem]);
  };

  // 결제 처리 함수
  const handlePayment = (): void => {
    const totalAmount = menuItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    Alert.alert("결제 완료", `총 결제 금액: ${totalAmount.toLocaleString()}원`);
  };

  // 메뉴 삭제 함수
  const handleDeleteMenu = (index: number): void => {
    setMenuItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <ScrollContainer>
        {menuItems.map((item, index) => (
          <MenuContainer key={index}>
            <MenuImage1
              source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
              resizeMode={"stretch"}
            />
            <MenuDetails>
              <MenuRow>
                <MenuItemText>{item.name}</MenuItemText>
                <PriceText>{`${item.price.toLocaleString()}원`}</PriceText>
                <DeleteButton onPress={() => handleDeleteMenu(index)}>
                  <Image
                    source={trashIcon} // 삭제 아이콘
                    style={{ width: 24, height: 24 }}
                  />
                </DeleteButton>
              </MenuRow>
              <Row>
                <ItemDescriptionText>
                  {"맛난 삼겹살과 쌈장으로 만든 덮밥"}
                </ItemDescriptionText>
              </Row>
              <Row>
                <SelectedOptionText>
                  {"옵션: 밥 추가 (+1000)"}
                </SelectedOptionText>
                <QuantityContainer>
                  <QuantityButton
                    onPress={() => handleQuantityChange(index, -1)}
                  >
                    <Text style={{ fontSize: 16 }}>{"-"}</Text>
                  </QuantityButton>
                  <QuantityTextBox>{item.quantity}</QuantityTextBox>
                  <QuantityButton
                    onPress={() => handleQuantityChange(index, 1)}
                  >
                    <Text style={{ fontSize: 16 }}>{"+"}</Text>
                  </QuantityButton>
                </QuantityContainer>
              </Row>
            </MenuDetails>
          </MenuContainer>
        ))}
        <AddMenuContainer onPress={handleAddMenu}>
          <Image
            source={plusIcon}
            style={{ width: 24, height: 24, marginRight: 15 }}
          />
          <AddMenuText>{"메뉴 추가"}</AddMenuText>
        </AddMenuContainer>
        <PaymentContainer>
          <Text style={{ fontSize: 16, marginBottom: 17 }}>
            {"결제금액을 확인해주세요"}
          </Text>
          <PaymentInfoContainer>
            <PaymentInfoRow>
              <PaymentText>{"주문금액"}</PaymentText>
              <PaymentText>{`${menuItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}원`}</PaymentText>
            </PaymentInfoRow>
            <View
              style={{
                height: 1,
                backgroundColor: "#BCBCBC",
                marginVertical: 5,
              }}
            />
            <PaymentInfoRow>
              <PaymentText>{"결제예정금액"}</PaymentText>
              <PaymentText>{`${menuItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}원`}</PaymentText>
            </PaymentInfoRow>
          </PaymentInfoContainer>
        </PaymentContainer>
        <ActionButtonContainer>
          <ActionButton primary onPress={handleAddMenu}>
            <ActionButtonText>{"더 담으러 가기"}</ActionButtonText>
          </ActionButton>
          <ActionButton onPress={handlePayment}>
            <ActionButtonText>{"결제하러가기"}</ActionButtonText>
          </ActionButton>
        </ActionButtonContainer>
      </ScrollContainer>
    </Container>
  );
}

export default MyCart;

// Styled components
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  background-color: #ffffff;
  padding-top: 15px;
  margin: 0 20px;
`;

const MenuContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: #000000;
  border-radius: 20px;
  border-width: 1px;
  margin-bottom: 20px;
  padding: 10px;
`;

const MenuImage1 = styled.Image`
  border-radius: 5px;
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const MenuDetails = styled.View`
  flex: 1;
  margin-right: 4px;
  gap: 15px;
`;

const MenuRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 10px;
`;

const MenuItemText = styled.Text`
  font-size: 20px;
`;

const PriceText = styled.Text`
  font-size: 18px;
`;

const ItemDescriptionText = styled.Text`
  color: #949494;
  font-size: 14px;
`;

const SelectedOptionText = styled.Text`
  color: #949494;
  font-size: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const QuantityButton = styled.TouchableOpacity`
  background-color: #d9d9d9;
  border-width: 1px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const QuantityTextBox = styled.Text`
  text-align: center;
  border-width: 1px;
  width: 30px;
  height: 30px;
  font-size: 20px;
`;

const AddMenuContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-color: #000000;
  border-radius: 10px;
  border-width: 1px;
  padding: 10px 10px;
  margin: 20px 40px;
  justify-content: center;
`;

const AddMenuText = styled.Text`
  color: #000000;
  font-size: 20px;
`;

const PaymentContainer = styled.View``;

const PaymentInfoContainer = styled.View`
  min-height: 100px;
  border-color: #000000; /* Colors.shadow */
  border-radius: 20px;
  border-width: 1px;
  padding: 10px 0;
  margin-bottom: 22px;
`;

const PaymentInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  flex: 1;
`;

const PaymentText = styled.Text`
  color: #000000; /* Colors.shadow */
  font-size: 20px;
`;

const ActionButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 40px;
  margin: auto;
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

// import MyPageButton from "./MyPageButton";
import StampItemMyPage from "./StampItemMyPage";
import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, Image, Text, View } from "react-native";

function MyPage() {
  return (
    <Container>
      <ScrollContainer>
        {/* 인사말 */}
        <GreetingContainer>
          <GreetingTextContainer>
            <GreetingText>{"안녕하세요 !"}</GreetingText>
            <NameContainer>
              <NameText1>{"희진"}</NameText1>
              <NameText2>{"님"}</NameText2>
            </NameContainer>
          </GreetingTextContainer>
          <InfoText>{"최근 6개월 동안 구매금액은 19,000원입니다."}</InfoText>
        </GreetingContainer>
        {/* 스탬프 관련 UI */}
        <StampContainer>
          <StampText>{"스탬프"}</StampText>
          <StampItemMyPage />
          <StampItemMyPage />
          <StampItemMyPage />
          <StampItemMyPage />
        </StampContainer>
        {/* 각 페이지 */}
        <OrderContainer>
          <OrderHeader>
            <MyPageButton>
              <ButtonCol>
                <ButtonText>{"나의 주문 (최근 3개월)"}</ButtonText>
                <ButtonText>{"0회"}</ButtonText>
              </ButtonCol>
            </MyPageButton>
            <MyPageButton>
              <ButtonCol>
                <ButtonText>{"총 주문 금액"}</ButtonText>
                <ButtonText>{"0원"}</ButtonText>
              </ButtonCol>
            </MyPageButton>
          </OrderHeader>
          <OrderHeader>
            <MyPageButton>
              <ButtonText>{"쿠폰"}</ButtonText>
            </MyPageButton>
            <MyPageButton>
              <ButtonText>{"주문내역"}</ButtonText>
            </MyPageButton>
          </OrderHeader>
        </OrderContainer>
        {/* 로그아웃 버트 */}
        <LogoutButton>
          <LogoutText>{"로그아웃"}</LogoutText>
        </LogoutButton>
      </ScrollContainer>
    </Container>
  );
}

export default MyPage;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled.ScrollView`
  /* flex: 1; */
  gap: 100px;
`;

const GreetingContainer = styled.View`
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const GreetingTextContainer = styled.View`
  flex-direction: row;
  margin-top: 65px;
`;

const GreetingText = styled.Text`
  font-size: 36px;
  font-weight: 300;
`;

const NameContainer = styled.View`
  flex-direction: row;
`;

const NameText1 = styled.Text`
  font-size: 36px;
  font-weight: bold;
`;

const NameText2 = styled.Text`
  font-size: 36px;
`;

const InfoText = styled.Text`
  font-size: 16px;
`;
const StampContainer = styled.View`
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 20px;
`;
const StampText = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
`;

const OrderContainer = styled.View`
  margin-bottom: 20px;
`;
const OrderHeader = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const MyPageButton = styled.TouchableOpacity`
  width: 180px;
  height: 60px;
  background-color: #435fff;
  border-color: #ffffff;
  border-radius: 10px;
  border-width: 1px;
  /* padding: 21px 0; */
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 15px;
`;
const LogoutButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #ffffff;
  border-color: #00000080;
  border-radius: 5px;
  border-width: 1px;
  margin: 0 150px;
  /* margin: 0 157px 9px 157px; */
`;

const LogoutText = styled.Text`
  font-size: 15px;
  padding: 10px;
`;
const ButtonCol = styled.View`
  align-items: center;
  /* padding: 10px; */
`;

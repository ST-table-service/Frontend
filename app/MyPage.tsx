import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  View,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import StampItemMyPage from "./StampItemMyPage";
import axios from "axios";
import mypage from "./json/mypage.json";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// 타입 정의
interface StampInfo {
  store_name: string;
  stamps_collected: number;
}

interface MyPageData {
  username: string;
  total_payment_last_6_months: number;
  stamp_info: StampInfo[];
  recent_orders_count: number;
  total_payment: number;
}

const BASE_URL = "서버_BASE_URL"; // 실제 서버 URL로 교체 필요

function MyPage({ navigation }: Props) {
  const [myPageData, setMyPageData] = useState<MyPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyPageData = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/mypage`);
      // if (
      //   response.data.code === "" &&
      //   response.data.message === "마이 페이지 정보 조회 성공"
      // ) {
      //   setMyPageData(response.data.data);
      // }
      const response = mypage;
      setMyPageData(response.data);
    } catch (error) {
      Alert.alert("오류", "마이페이지 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // 로그아웃 로직 구현
    // 예: 토큰 제거, 상태 초기화 등
    Alert.alert("알림", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: () => {
          // AsyncStorage.removeItem('userToken');
          navigation.navigate("Login");
        },
      },
    ]);
  };

  useEffect(() => {
    fetchMyPageData();
  }, []);

  if (isLoading || !myPageData) {
    return (
      <Container>
        <LoadingText>로딩중...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContainer>
        {/* 인사말 */}
        <GreetingContainer>
          <GreetingTextContainer>
            <GreetingText>{"안녕하세요 !"}</GreetingText>
            <NameContainer>
              <NameText1>{myPageData.username}</NameText1>
              <NameText2>{"님"}</NameText2>
            </NameContainer>
          </GreetingTextContainer>
          <InfoText>
            {`최근 6개월 동안 구매금액은 ${myPageData.total_payment_last_6_months.toLocaleString()}원입니다.`}
          </InfoText>
        </GreetingContainer>

        {/* 스탬프 관련 UI */}
        <StampContainer>
          <StampText>{"스탬프"}</StampText>
          {myPageData.stamp_info.map((stamp, index) => (
            <StampItemMyPage
              key={index}
              storeName={stamp.store_name}
              stampCount={stamp.stamps_collected}
            />
          ))}
        </StampContainer>

        {/* 각 페이지 */}
        <OrderContainer>
          <OrderHeader>
            <MyPageButton>
              <ButtonCol>
                <ButtonText>{"나의 주문 (최근 3개월)"}</ButtonText>
                <ButtonText>{`${myPageData.recent_orders_count}회`}</ButtonText>
              </ButtonCol>
            </MyPageButton>
            <MyPageButton>
              <ButtonCol>
                <ButtonText>{"총 주문 금액"}</ButtonText>
                <ButtonText>{`${myPageData.total_payment.toLocaleString()}원`}</ButtonText>
              </ButtonCol>
            </MyPageButton>
          </OrderHeader>
          <OrderHeader>
            <MyPageButton onPress={() => navigation.navigate("Coupon")}>
              <ButtonText>{"쿠폰"}</ButtonText>
            </MyPageButton>
            <MyPageButton onPress={() => navigation.navigate("History")}>
              <ButtonText>{"주문내역"}</ButtonText>
            </MyPageButton>
          </OrderHeader>
        </OrderContainer>

        {/* 로그아웃 버튼 */}
        <LogoutButton onPress={handleLogout}>
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
`;

const LogoutText = styled.Text`
  font-size: 15px;
  padding: 10px;
`;
const ButtonCol = styled.View`
  align-items: center;
`;

// ... (나머지 styled components는 동일)

const LoadingText = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #435fff;
`;

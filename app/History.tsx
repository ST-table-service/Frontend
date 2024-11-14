import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import historyData from "./json/history.json";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

const BASE_URL = "서버_BASE_URL"; // 실제 서버 URL로 교체 필요

interface Order {
  order_id: number;
  store_name: string;
  order_date: string;
  order_status: string;
  total_payment: number;
}

interface OrderData {
  total_order: number;
  total_price: number;
  orders: Order[];
}

type HistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "History"
>;

export default function History() {
  const [orderData, setOrderData] = useState<OrderData>({
    total_order: 0,
    total_price: 0,
    orders: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<HistoryScreenProp>();

  const fetchOrderHistory = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/order-history`);
      // if (
      //   response.data.code === "" &&
      //   response.data.message === "주문 내역 목록 조회 성공"
      // ) {
      //   setOrderData(response.data.data);
      // }
      setOrderData(historyData.data);
    } catch (error) {
      Alert.alert("오류", "주문 내역을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getDateRange = (): string => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);

    return `${start.getFullYear()}.${String(start.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(start.getDate()).padStart(
      2,
      "0"
    )} ~ ${end.getFullYear()}.${String(end.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(end.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  if (isLoading) {
    return (
      <Container>
        <LoadingText>로딩중...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContainer>
        <TextRow>
          <LabelText>{"전체"}</LabelText>
          <Text
            style={{ color: "#949494", fontSize: 13 }}
          >{` ${getDateRange()} `}</Text>
        </TextRow>
        <Divider />
        <InfoRow>
          <Row>
            <InfoText>{"총"}</InfoText>
            <AmountText>{`${orderData.total_order}건`}</AmountText>
          </Row>
          <Row>
            <InfoText>{"총 금액"}</InfoText>
            <AmountText>{`${formatPrice(
              orderData.total_price
            )} 원`}</AmountText>
          </Row>
        </InfoRow>

        {orderData.orders.length === 0 ? (
          <EmptyText>주문 내역이 없습니다</EmptyText>
        ) : (
          <ActionContainer>
            {orderData.orders.map((order) => (
              <TouchableOpacity
                key={order.order_id}
                onPress={() =>
                  navigation.navigate("HistoryDetail", {
                    orderId: order.order_id,
                  })
                }
              >
                <ActionItem>
                  <ActionImage
                    source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
                    resizeMode="stretch"
                  />
                  <ActionTextContainer>
                    <ActionTextTitle>{order.store_name}</ActionTextTitle>
                    <ActionTextSubtitle>
                      {`${formatDate(order.order_date)} | ${
                        order.order_status
                      }`}
                    </ActionTextSubtitle>
                    <ActionTextAmount>
                      {`${formatPrice(order.total_payment)} 원`}
                    </ActionTextAmount>
                  </ActionTextContainer>
                  <Image
                    source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
                    resizeMode="stretch"
                    style={{ width: 28, height: 40 }}
                  />
                </ActionItem>
              </TouchableOpacity>
            ))}
          </ActionContainer>
        )}
      </ScrollContainer>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding-top: 17px;
  margin: 0 20px;
`;

const TextRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 14px;
`;

const LabelText = styled.Text`
  color: #949494;
  font-size: 13px;
  margin-right: 4px;
  flex: 1;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #bcbcbc;
  margin-bottom: 11px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 35px;
`;

const Row = styled.View`
  flex-direction: row;
  gap: 5px;
`;

const InfoText = styled.Text`
  color: #949494;
  font-size: 13px;
`;

const AmountText = styled.Text`
  color: #894700;
  font-size: 13px;
`;

const ActionContainer = styled.View`
  margin-bottom: 25px;
`;

const ActionItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-color: #a4a4a4cc;
  border-radius: 20px;
  border-width: 2px;
  padding: 20px;
  margin-bottom: 10px;
`;

const ActionImage = styled.Image`
  width: 55px;
  height: 55px;
  margin-right: 13px;
`;

const ActionTextContainer = styled.View`
  flex: 1;
  margin-right: 4px;
`;

const ActionTextTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 6px;
`;

const ActionTextSubtitle = styled.Text`
  color: #949494;
  font-size: 10px;
  margin-bottom: 7px;
`;

const ActionTextAmount = styled.Text`
  color: #949494;
  font-size: 10px;
`;

const LoadingText = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #435fff;
`;

const EmptyText = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #666666;
`;

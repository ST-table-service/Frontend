import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, Image, Alert } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";
import orderDetailData from "./json/historydetail.json";
import { RootStackParamList } from "./types";

const BASE_URL = "서버_BASE_URL"; // 실제 서버 URL로 교체 필요

interface OrderItem {
  menu_name: string;
  quantity: number;
  price: number;
}

interface OrderDetail {
  order_id: number;
  store_name: string;
  order_date: string;
  items: OrderItem[];
  total_price: number;
  coupon_discount: number;
  total_payment: number;
  stamp_count: number;
}

interface ApiResponse {
  code: string;
  message: string;
  data: OrderDetail;
}

type RouteParams = {
  OrderDetail: {
    orderId: number;
  };
};

type OrderDetailScreenRouteProp = RouteProp<RootStackParamList, "OrderDetail">;

export default function HistoryDetail() {
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute<OrderDetailScreenRouteProp>();
  const { orderId } = route.params;

  const fetchOrderDetail = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/order/${orderId}`);
      // if (response.data.code === "" && response.data.message === "주문 상세 내역 조회 성공") {
      //   setOrderDetail(response.data.data);
      // }
      setOrderDetail(orderDetailData.data);
    } catch (error) {
      Alert.alert("오류", "주문 상세 내역을 불러오는데 실패했습니다.");
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

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  if (isLoading || !orderDetail) {
    return (
      <Container>
        <LoadingText>로딩중...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContainer>
        <HeaderSection>
          <StoreName>{orderDetail.store_name}</StoreName>
          <OrderDate>{formatDate(orderDetail.order_date)}</OrderDate>
        </HeaderSection>

        <Divider />

        <Section>
          <SectionTitle>주문 메뉴</SectionTitle>
          {orderDetail.items.map((item, index) => (
            <ItemRow key={index}>
              <ItemInfo>
                <ItemName>{item.menu_name}</ItemName>
                <ItemQuantity>{`수량 ${item.quantity}개`}</ItemQuantity>
              </ItemInfo>
              <ItemPrice>{`${formatPrice(item.price)}원`}</ItemPrice>
            </ItemRow>
          ))}
        </Section>

        <Divider />

        <Section>
          <SectionTitle>결제 금액</SectionTitle>
          <PriceRow>
            <PriceLabel>주문 금액</PriceLabel>
            <PriceValue>{`${formatPrice(
              orderDetail.total_price
            )}원`}</PriceValue>
          </PriceRow>
          <PriceRow>
            <PriceLabel>쿠폰 할인</PriceLabel>
            <PriceValue>{`-${formatPrice(
              orderDetail.coupon_discount
            )}원`}</PriceValue>
          </PriceRow>
          <PriceRow>
            <PriceLabel>총 결제 금액</PriceLabel>
            <TotalPrice>{`${formatPrice(
              orderDetail.total_payment
            )}원`}</TotalPrice>
          </PriceRow>
        </Section>

        <StampInfo>
          <StampText>{`이 주문으로 적립된 스탬프: ${orderDetail.stamp_count}개`}</StampText>
        </StampInfo>
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

const HeaderSection = styled.View`
  margin-bottom: 20px;
`;

const StoreName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const OrderDate = styled.Text`
  color: #949494;
  font-size: 13px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #bcbcbc;
  margin: 15px 0;
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ItemRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ItemInfo = styled.View`
  flex: 1;
`;

const ItemName = styled.Text`
  font-size: 15px;
  margin-bottom: 4px;
`;

const ItemQuantity = styled.Text`
  color: #949494;
  font-size: 13px;
`;

const ItemPrice = styled.Text`
  font-size: 15px;
  text-align: right;
`;

const PriceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const PriceLabel = styled.Text`
  color: #949494;
  font-size: 14px;
`;

const PriceValue = styled.Text`
  font-size: 14px;
`;

const TotalPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: right;
  color: #894700;
`;

const StampInfo = styled.View`
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 15px;
  margin-top: 10px;
`;

const StampText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

const LoadingText = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #435fff;
`;

import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import orderstautsjson from "./json/orderstatus.json";

interface OrderItem {
  menu_name: string;
  options: string[];
  quantity: number;
}

// 서버 응답 데이터 타입
interface ServerOrderData {
  store_id: number;
  store_name: string;
  order_id: number;
  order_status: string; // 서버에서 오는 원래 형태
  item_quantity: number;
  items: OrderItem[];
}

// 우리 앱에서 사용할 데이터 타입
interface OrderData {
  store_id: number;
  store_name: string;
  order_id: number;
  order_status: "ORDERED" | "PREPARING" | "COMPLETED";
  item_quantity: number;
  items: OrderItem[];
}

type RouteParams = {
  Order: {
    orderId: number;
  };
};

type OrderScreenRouteProp = RouteProp<RouteParams, "Order">;

const BASE_URL = "서버_BASE_URL";
const POLLING_INTERVAL = 5000;

// 서버 응답을 앱 데이터 형식으로 변환하는 함수
const convertServerResponse = (data: ServerOrderData): OrderData => {
  // order_status가 우리가 예상하는 값인지 확인하고 변환
  let status: "ORDERED" | "PREPARING" | "COMPLETED";
  switch (data.order_status) {
    case "ORDERED":
      status = "ORDERED";
      break;
    case "PREPARING":
      status = "PREPARING";
      break;
    case "COMPLETED":
      status = "COMPLETED";
      break;
    default:
      status = "ORDERED"; // 기본값 설정
  }

  return {
    ...data,
    order_status: status,
  };
};

export default function Order() {
  // const route = useRoute<OrderScreenRouteProp>();
  // const { orderId } = route.params;

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getKoreanStatus = (status: "ORDERED" | "PREPARING" | "COMPLETED") => {
    switch (status) {
      case "ORDERED":
        return "주문 완료";
      case "PREPARING":
        return "준비 중";
      case "COMPLETED":
        return "준비 완료";
      default:
        return "알 수 없음";
    }
  };

  const getProgressPercentage = (
    status: "ORDERED" | "PREPARING" | "COMPLETED"
  ) => {
    switch (status) {
      case "ORDERED":
        return 22;
      case "PREPARING":
        return 66;
      case "COMPLETED":
        return 100;
      default:
        return 0;
    }
  };

  const fetchOrderStatus = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/orders/${orderId}`);
      // if (
      //   response.data.code === "" &&
      //   response.data.message === "주문 생성 성공"
      // ) {
      //   // 서버 응답을 우리 앱의 형식으로 변환
      //   const convertedData = convertServerResponse(response.data.data);
      //   setOrderData(convertedData);
      // }
      const convertedData = convertServerResponse(orderstautsjson.data);
      setOrderData(convertedData);
    } catch (error) {
      Alert.alert("오류", "주문 상태를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderStatus();
  }, []);

  // useEffect(() => {
  //   fetchOrderStatus();
  //   const intervalId = setInterval(fetchOrderStatus, POLLING_INTERVAL);

  //   return () => clearInterval(intervalId);
  // }, [orderId]);

  if (isLoading || !orderData) {
    return (
      <SafeArea>
        <LoadingText>주문 정보를 불러오는 중...</LoadingText>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ScrollContainer>
        <OrderInfo>
          <View>
            <RestaurantName>
              <Text style={{ fontSize: 28 }}>{orderData.store_name}</Text>에서
            </RestaurantName>
            <StatusText>
              {orderData.order_status === "ORDERED"
                ? "주문을 확인하고 있습니다."
                : orderData.order_status === "PREPARING"
                ? "음식을 준비하고 있습니다."
                : "음식이 준비되었습니다."}
            </StatusText>
          </View>
          <OrderNumberBox>
            <OrderNumberText>
              주문 번호 {"\n"}
              {orderData.order_id}번
            </OrderNumberText>
          </OrderNumberBox>
        </OrderInfo>
        <WarningText>
          주문 상황에 따라 준비가 늦어질 수 있습니다.{"\n"}잠시만 기다려주세요.
        </WarningText>
        <StatusContainer>
          <StatusRow>
            <StatusTextSmall
              style={{
                color:
                  orderData.order_status === "ORDERED" ? "#435fff" : "#a4a4a4",
              }}
            >
              주문 완료
            </StatusTextSmall>
            <StatusTextSmall
              style={{
                color:
                  orderData.order_status === "PREPARING"
                    ? "#435fff"
                    : "#a4a4a4",
              }}
            >
              준비 중
            </StatusTextSmall>
            <StatusTextSmall
              style={{
                color:
                  orderData.order_status === "COMPLETED"
                    ? "#435fff"
                    : "#a4a4a4",
              }}
            >
              준비 완료
            </StatusTextSmall>
          </StatusRow>
          <ProgressBarContainer>
            <ProgressBar
              progress={getProgressPercentage(orderData.order_status)}
            />
          </ProgressBarContainer>
        </StatusContainer>

        {/* 주문 항목들 표시 */}
        {orderData.items.map((item, index) => (
          <OrderDetails key={index}>
            <OrderImage
              source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
              resizeMode="stretch"
            />
            <OrderDescription>
              <OrderTitle>{`${item.menu_name} ${
                item.quantity > 1 ? `x${item.quantity}` : ""
              }`}</OrderTitle>
              {item.options.map((option, optionIndex) => (
                <OrderOption key={optionIndex}>{option}</OrderOption>
              ))}
            </OrderDescription>
          </OrderDetails>
        ))}
      </ScrollContainer>
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding-top: 17px;
  margin: 0 20px;
`;

const OrderInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const RestaurantName = styled.Text``;

const OrderNumberBox = styled.View`
  width: 90px;
  background-color: #435fffb0;
  border-radius: 5px;
  padding: 11px 13px;
`;

const OrderNumberText = styled.Text`
  color: #000000;
  font-size: 16px;
  width: 64px;
`;

const StatusText = styled.Text`
  color: #000000;
  font-size: 24px;
`;

const WarningText = styled.Text`
  color: #949494;
  font-size: 16px;
  margin-bottom: 30px;
`;

const StatusContainer = styled.View`
  background-color: #ffffff;
  border-color: #000000;
  border-radius: 20px;
  border-width: 2px;
  padding: 34px 20px;
  margin-bottom: 30px;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 7px;
`;

const StatusTextSmall = styled.Text`
  color: #a4a4a4;
  font-size: 12px;
  flex: 1;
`;

const ProgressBarContainer = styled.View`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-top: 20px;
`;

// ProgressBar에 타입 지정
interface ProgressBarProps {
  progress: number; // progress는 0~100 사이의 숫자
}
const ProgressBar = styled.View<ProgressBarProps>`
  height: 100%;
  border-radius: 5px;
  background-color: #435fffb0;
  width: ${(props) => props.progress}%;
`;

const OrderDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

const OrderImage = styled.Image`
  border-radius: 340px;
  width: 108px;
  height: 85px;
  margin-right: 11px;
`;

const OrderDescription = styled.View`
  flex: 1;
`;

const OrderTitle = styled.Text`
  color: #000000;
  font-size: 16px;
  margin-bottom: 11px;
`;

const OrderOption = styled.Text`
  color: #949494;
  font-size: 16px;
  margin-left: 3px;
`;

const LoadingText = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #435fff;
`;

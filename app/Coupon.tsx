import { CouponItem } from "./CouponItem";
import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, Image, Text } from "react-native";

const Coupon = () => {
  const d = [
    {
      amount: "1,000원",
      description: "할인 쿠폰",
      conditions: "5,000원 이상 구매 시 사용 가능",
      expiration: "사용 기한 : 0000.00.00 - 0000.00.00",
    },
    {
      amount: "2,000원",
      description: "할인 쿠폰",
      conditions: "7,000원 이상 구매 시 사용 가능",
      expiration: "사용 기한 : 0000.00.00 - 0000.00.00",
    },
    {
      amount: "천원의 아침밥",
      description: "쿠폰",
      conditions: "0원 이상 구매 시 사용 가능",
      expiration: "사용 기한 : 0000.00.00 - 0000.00.00",
    },
  ];
  return (
    <Container>
      <ScrollContainer>
        {/* 쿠폰 항목들 반복 */}
        {d.map((coupon, index) => (
          <CouponItem key={index} coupon={coupon} />
        ))}
      </ScrollContainer>
    </Container>
  );
};

export default Coupon;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding-top: 17px;
`;

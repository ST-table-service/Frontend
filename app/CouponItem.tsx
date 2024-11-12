import React from "react";
import styled from "styled-components/native";
export function CouponItem({ coupon }) {
  return (
    <CouponContainer>
      <CouponDetails>
        <CouponAmount>{coupon.amount}</CouponAmount>
        <CouponDescription>{coupon.description}</CouponDescription>
        <CouponConditions>{coupon.conditions}</CouponConditions>
        <CouponExpiration>{coupon.expiration}</CouponExpiration>
      </CouponDetails>
      <UseButton>
        <UseButtonText>{"사용 가능"}</UseButtonText>
      </UseButton>
    </CouponContainer>
  );
}

const CouponContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-color: #000000;
  border-radius: 20px;
  border-width: 1px;
  padding: 15px 20px;
  margin: 0 15px 28px 15px;
`;

const CouponDetails = styled.View`
  width: 216px;
`;

const CouponAmount = styled.Text`
  color: #000000;
  font-size: 24px;
  margin-bottom: 11px;
  margin-left: 1px;
`;

const CouponDescription = styled.Text`
  font-size: 16px;
  margin-bottom: 11px;
`;

const CouponConditions = styled.Text`
  color: #949494;
  font-size: 13px;
  margin-bottom: 10px;
`;

const CouponExpiration = styled.Text`
  color: #949494;
  font-size: 13px;
`;

const UseButton = styled.View`
  width: 100px;
  align-items: center;
  background-color: #435fff;
  border-color: #000000;
  border-radius: 50px;
  border-width: 1px;
  padding: 40px 0;
`;

const UseButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
`;

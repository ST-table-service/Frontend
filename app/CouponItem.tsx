import React from "react";
import styled from "styled-components/native";

interface ValidityPeriod {
  start_date: string;
  end_date: string;
}

interface CouponData {
  coupon_id: number;
  coupon_name: string;
  discount_amount: number;
  store_name: string;
  validity_period: ValidityPeriod;
  is_available: boolean;
}

interface CouponItemProps {
  coupon: CouponData;
}

export function CouponItem({ coupon }: CouponItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <CouponContainer>
      <CouponDetails>
        <CouponAmount>{`${coupon.discount_amount.toLocaleString()}원`}</CouponAmount>
        <CouponDescription>{coupon.coupon_name}</CouponDescription>
        <CouponConditions>{coupon.store_name}</CouponConditions>
        <CouponExpiration>
          {`사용 기한 : ${formatDate(
            coupon.validity_period.start_date
          )} - ${formatDate(coupon.validity_period.end_date)}`}
        </CouponExpiration>
      </CouponDetails>
      <UseButton available={coupon.is_available}>
        <UseButtonText>
          {coupon.is_available ? "사용 가능" : "사용 불가"}
        </UseButtonText>
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

interface UseButtonProps {
  available: boolean;
}

const UseButton = styled.View<UseButtonProps>`
  width: 100px;
  align-items: center;
  background-color: ${(props) => (props.available ? "#435fff" : "#949494")};
  border-color: #000000;
  border-radius: 50px;
  border-width: 1px;
  padding: 40px 0;
`;

const UseButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
`;

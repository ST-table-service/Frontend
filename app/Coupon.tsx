import { CouponItem } from "./CouponItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { Alert } from "react-native";
import { CouponData } from "./types";
import couponjson from "./json/coupon.json";

const BASE_URL = "서버_BASE_URL"; // 실제 서버 URL로 교체 필요

const Coupon = () => {
  const [coupons, setCoupons] = useState<CouponData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCoupons = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/coupons`);
      const response = couponjson;
      // if (response.data.data) {
      //   setCoupons(response.data.data);
      // }
      setCoupons(couponjson.data);
    } catch (error) {
      Alert.alert("오류", "쿠폰 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
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
        {coupons.length === 0 ? (
          <EmptyText>사용 가능한 쿠폰이 없습니다</EmptyText>
        ) : (
          coupons.map((coupon) => (
            <CouponItem key={coupon.coupon_id} coupon={coupon} />
          ))
        )}
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

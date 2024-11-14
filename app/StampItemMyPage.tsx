import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

// Props 타입 정의
interface StampItemProps {
  storeName: string;
  stampCount: number;
  maxStamps?: number; // 선택적 prop, 기본값은 10
}

// styled-components를 컴포넌트 외부로 이동
const StampContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StampCountText = styled.Text`
  font-size: 20px;
  margin-right: 3px;
`;

const StampIndicator = styled.View`
  flex: 1;
  align-self: stretch;
`;

const StampBadge = styled.View`
  width: 68px;
  align-items: center;
  background-color: #ffb3b399;
  border-radius: 30px;
  padding: 7px 0;
`;

const StoreNameText = styled.Text`
  color: #000000;
  font-size: 10px;
`;

export default function StampItemMyPage({
  storeName,
  stampCount,
  maxStamps = 10, // 기본값 설정
}: StampItemProps) {
  return (
    <StampContainer>
      <StampCountText>{stampCount}</StampCountText>
      <StampCountText>{`/${maxStamps}`}</StampCountText>
      <StampBadge>
        <StoreNameText>{storeName}</StoreNameText>
      </StampBadge>
    </StampContainer>
  );
}

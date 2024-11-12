import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
export default function StampItemMyPage({}) {
  const StampContainer = styled.View`
    flex-direction: row;
    /* align-items: center; */
    /* margin: 0 129px 11px 129px; */
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
  return (
    <StampContainer>
      <StampCountText>{"0"}</StampCountText>
      <StampCountText>{"/10"}</StampCountText>
      {/* <StampIndicator /> */}
      <StampBadge>
        <Text
          style={{
            color: "#000000",
            fontSize: 10,
          }}
        >
          {"포포420"}
        </Text>
      </StampBadge>
    </StampContainer>
  );
}

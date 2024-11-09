import React from "react";
import { ImageProps } from "react-native";
import { Shadow } from "react-native-shadow-2";
import styled from "styled-components/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

interface TabBarProps extends BottomTabBarProps {
  homeIcon: any;
  plateIcon: any;
  profileIcon: any;
}

export default function TabBar({
  homeIcon,
  plateIcon,
  profileIcon,
  navigation,
}: TabBarProps) {
  return (
    <Shadow
      distance={5}
      startColor="#00000020"
      endColor="#00000000"
      style={{
        width: "100%",
      }}
    >
      <TabContainer>
        <TabIconCon
          onPress={() => navigation.navigate("HomeStack", { screen: "Home" })}
        >
          <TabIcon source={homeIcon} />
          <TabIconText>홈</TabIconText>
        </TabIconCon>
        <PlateIconCon onPress={() => navigation.navigate("Order")}>
          <TabIcon source={plateIcon} isPlate={true} />
          <TabIconText>주문</TabIconText>
        </PlateIconCon>
        <TabIconCon>
          <TabIcon source={profileIcon} resizeMode="contain" />
          <TabIconText>마이페이지</TabIconText>
        </TabIconCon>
      </TabContainer>
    </Shadow>
  );
}
const TabContainer = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end; /* align-items를 flex-end로 변경 */
  border-top-color: black;
  /* border-top-width: 1px; */
  height: 70px; /* 높이를 명시적으로 설정 */
  padding-bottom: 10px; /* 아이콘이 border 위로 올라오도록 padding 추가 */
`;
const TabIconCon = styled.TouchableOpacity`
  align-items: center;
  gap: 5px;
  width: 60px;
  height: 50px;
`;
interface CustomImageProps extends ImageProps {
  isPlate?: boolean;
}
const PlateIconCon = styled.TouchableOpacity`
  align-items: center;
  gap: 5px;
`;

const TabIcon = styled.Image<CustomImageProps>`
  width: ${(props) => (props.isPlate ? "70px" : "30px")};
  height: ${(props) => (props.isPlate ? "70px" : "30px")};
  position: ${(props) =>
    props.isPlate
      ? "absolute"
      : "relative"}; /* 주문 아이콘을 절대 위치로 설정 */
  bottom: ${(props) =>
    props.isPlate
      ? "20px"
      : "0"}; /* 높이를 맞추기 위해 주문 아이콘을 위로 이동 */
`;
const TabIconText = styled.Text`
  font-size: 12px;
  text-align: center;
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { PopularMenuItem } from "./PopularMenuItem";
import popularEx from "./PopularEx.json"; // 로컬 JSON 파일 불러오기

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  background-color: #ffffff;
  padding-top: 8px;
`;

export default function Popular() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 데이터를 async로 불러오는 함수
    const fetchData = async () => {
      try {
        // 서버 URL을 사용하려면 아래 줄을 활성화하세요
        // const response = await fetch("https://example.com/api/popularMenus"); // 서버 URL로 대체

        // 로컬 JSON 파일에서 데이터를 설정
        setMenuData(popularEx.data);
      } catch (error) {
        console.error("Error loading local data:", error);
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; // 데이터 로딩 중 표시
  }

  return (
    <Container>
      <ScrollContainer>
        {menuData.map((item) => (
          <PopularMenuItem
            key={item.menu_id}
            image={{ uri: item.menu_images }}
            restaurant={item.store_name}
            title={item.menu_name}
            price={`${item.price}원`}
            description={item.description}
            popular={true}
          />
        ))}
      </ScrollContainer>
    </Container>
  );
}

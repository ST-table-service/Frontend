import { PopularMenuItem } from "./PopularMenuItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, Alert } from "react-native";
import axios from "axios";
import popularjson from "./json/popular.json";

const BASE_URL = "서버_BASE_URL"; // 실제 서버 URL로 교체 필요

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  background-color: #ffffff;
  padding-top: 8px;
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
interface MenuItem {
  store_id: number;
  store_name: string;
  menu_id: number;
  menu_name: string;
  price: number;
  menu_images: string;
  description: string;
}
export default function Popular() {
  const [popularMenus, setPopularMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopularMenus = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/popular-menus`);
      // if (response.data.code === "SUCCESS") {
      //   setPopularMenus(response.data.data);
      // }
      setPopularMenus(popularjson.data);
    } catch (error) {
      Alert.alert("오류", "인기 메뉴를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMenus();
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
        {popularMenus.length === 0 ? (
          <EmptyText>인기 메뉴가 없습니다</EmptyText>
        ) : (
          popularMenus.map((menu) => (
            <PopularMenuItem
              key={menu.menu_id}
              store_name={menu.store_name}
              menu_images={menu.menu_images}
              menu_name={menu.menu_name}
              price={menu.price}
              description={menu.description}
              popular={true}
            />
          ))
        )}
      </ScrollContainer>
    </Container>
  );
}

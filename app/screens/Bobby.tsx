import styled from "styled-components";
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuItem, RootStackParamList } from "../types";
import { RestMenuItem } from "../components/RestMenuItem";
import { MenuListItem } from "../components/MenuListItem";
import { useEffect, useState } from "react";
import menusJson from "../json/menus.json";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function Bobby({ navigation }: Props) {
  const [menus, setMenus] = useState<MenuItem>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // const response = await fetch("YOUR_API_URL"); // 여기에 API URL을 입력하세요
        // const data = await response.json();
        const data = menusJson;
        if (data.code === "") {
          // 서버 응답 코드 확인
          setMenus(data.data.menus);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <Container>
      <FlatList
        data={menus}
        renderItem={({ item }) => <MenuListItem {...item} />}
        keyExtractor={(item) => item.id}
        style={styles.menuList} // StyleSheet 스타일 적용
      />
    </Container>
  );
}
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  background-color: #ffffff;
  padding-top: 8px;
`;
const styles = StyleSheet.create({
  menuList: {
    flex: 1,
  },
});

// const DUMMY_MENU: MenuItem[] = [
//   {
//     id: "1",
//     title: "삼겹덮밥",
//     price: 3500,
//     description: "맛난 삼겹살과 쌈장으로 만든 덮밥",
//     image: require("../../assets/images/PopMenuItem1.png"),
//     popular: true,
//     options: [
//       { id: "extra", name: "곱빼기", price: 1000 },
//       { id: "rice", name: "밥 추가", price: 1000 },
//       { id: "noodle", name: "면 추가", price: 1500 },
//     ],
//   },
//   // ... 더 많은 메뉴 아이템
// ];

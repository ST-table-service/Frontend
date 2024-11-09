import { PopularMenuItem } from "./PopularMenuItem";
import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, Image, Text } from "react-native";

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
  const menuImage1 = require("../assets/images/PopMenuItem1.png");
  return (
    <Container>
      <ScrollContainer>
        <PopularMenuItem
          image={menuImage1}
          restaurant="바비든든"
          title="삼겹덮밥"
          price="3,500원"
          description="맛난 삼겹살과 쌈장으로 만든 덮밥"
        />
        <PopularMenuItem
          image={menuImage1}
          restaurant="바비든든"
          title="삼겹덮밥"
          price="3,500원"
          description="맛난 삼겹살과 쌈장으로 만든 덮밥"
        />
        <PopularMenuItem
          image={menuImage1}
          restaurant="바비든든"
          title="삼겹덮밥"
          price="3,500원"
          description="맛난 삼겹살과 쌈장으로 만든 덮밥"
        />
        <PopularMenuItem
          image={menuImage1}
          restaurant="바비든든"
          title="삼겹덮밥"
          price="3,500원"
          description="맛난 삼겹살과 쌈장으로 만든 덮밥"
        />
        <PopularMenuItem
          image={menuImage1}
          restaurant="바비든든"
          title="삼겹덮밥"
          price="3,500원"
          description="맛난 삼겹살과 쌈장으로 만든 덮밥"
        />
      </ScrollContainer>
    </Container>
  );
}

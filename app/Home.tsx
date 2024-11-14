import NoticeItem from "./NoticeItem";
import styled from "styled-components/native";
import IconContainer from "./IconContainer";
import {
  FlatList,
  ImageProps,
  ListRenderItem,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useEffect, useState } from "react";
import noticeJson from "./json/notice.json";

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};
interface Notice {
  id: number;
  storeId: number;
  storeName: string;
  title: string;
  createdAt: string;
}

export default function Home({ navigation }: HomeProps) {
  const thumbsIcon = require("../assets/images/thumbs.png");
  const bunsikIcon = require("../assets/images/bunsik.png");
  const noodleIcon = require("../assets/images/noodle.png");
  const katsuIcon = require("../assets/images/katsu.png");
  const soupIcon = require("../assets/images/soup.png");
  const bibimbapIcon = require("../assets/images/bibimbap.png");

  const stampIcon = require("../assets/images/stamp.png");
  const couponIcon = require("../assets/images/coupon.png");
  const billIcon = require("../assets/images/bill.png");

  const notice1 = require("../assets/images/notice1.png");

  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // const response = await fetch("YOUR_API_URL"); // 여기에 API URL을 입력하세요
        // const data = await response.json();
        const data = noticeJson;
        if (data.code === "") {
          // 서버 응답 코드 확인
          setNotices(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      }
    };

    fetchNotices();
  }, []);

  const renderNoticeItem: ListRenderItem<Notice> = ({ item }) => (
    <NoticeItem
      date={new Date(item.createdAt).toLocaleDateString()} // 날짜 포맷
      restaurant={item.storeName}
      content={item.title}
      image={require("../assets/images/notice1.png")} // 공지사항 이미지
    />
  );

  return (
    <Container>
      <StyledScrollView>
        <Greating gap="10px">
          <TextStyled fontSize={28} bold={false}>
            {"어서오세요!"}
          </TextStyled>
          <NameRow>
            <TextStyled fontSize={28} bold={true}>
              {"희진"}
            </TextStyled>
            <TextStyled fontSize={26}> {"님"}</TextStyled>
          </NameRow>
        </Greating>
        <MenuContainer>
          <IconRaw1>
            <IconContainer
              text="인기메뉴"
              imageUrl={thumbsIcon}
              navigation={navigation}
              screen="Popular"
            />
            <IconContainer
              text="바비든든"
              imageUrl={bibimbapIcon}
              navigation={navigation}
              screen="BobbyStack"
            />
            <IconContainer
              text="포포420"
              imageUrl={noodleIcon}
              navigation={navigation}
              screen="Bobby"
            />
          </IconRaw1>
          <IconRaw1>
            <IconContainer
              text="폭풍분식"
              imageUrl={bunsikIcon}
              navigation={navigation}
              screen="Bobby"
            />
            <IconContainer
              text="51장국밥"
              imageUrl={soupIcon}
              navigation={navigation}
              screen="Bobby"
            />
            <IconContainer
              text="경성카츠"
              imageUrl={katsuIcon}
              navigation={navigation}
              screen="Bobby"
            />
          </IconRaw1>
        </MenuContainer>

        {/* <RowContainer>
          <IconContainer
            text="스탬프"
            imageUrl={stampIcon}
            navigation={navigation}
            screen="Popular"
          />
          <IconContainer
            text="마이 쿠폰"
            imageUrl={couponIcon}
            navigation={navigation}
            screen="Coupon"
          />
          <IconContainer
            text="주문 내역"
            imageUrl={billIcon}
            navigation={navigation}
            screen="Popular"
          />
        </RowContainer> */}
        <NoticeRow>
          <ImageStyled source={require("../assets/images/megaphone.png")} />
          <NoticeBoardText>{"공지사항"}</NoticeBoardText>
        </NoticeRow>
        <FlatList
          data={notices}
          renderItem={renderNoticeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }} // 여백 추가
        />
      </StyledScrollView>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding-top: 17px;
`;

const MenuContainer = styled.View`
  border-color: #000000;
  border-radius: 20px;
  border-width: 2px;
  padding: 22px 54px;
  margin: 0 20px 30px;
  gap: 30px;
`;

const IconRaw1 = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

interface CustomTextProps extends TextProps {
  fontSize?: number;
  bold?: boolean;
}

const TextStyled = styled.Text<CustomTextProps>`
  font-size: ${(props) => props.fontSize || 14}px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

interface CustomRowProps extends ViewProps {
  gap?: string;
}
const Row = styled.View<CustomRowProps>`
  flex-direction: row;
  gap: ${(props) => props.gap || "0px"};
`;
const Greating = styled(Row)`
  text-align: center;
  align-items: baseline;
  justify-content: center;
  margin: 20px 0;
`;
const RowContainer = styled(Row)`
  justify-content: space-evenly;
  background-color: #edebeb;
  border-color: #000000;
  border-radius: 20px;
  border-width: 2px;
  padding: 30px 20px;
  margin: 10px 20px 20px;
`;

const ImageStyled = styled.Image`
  width: 25px;
  height: 25px;
`;
const NoticeRow = styled(Row)`
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;
const NameRow = styled(Row)`
  align-items: baseline;
`;
const NoticeBoardText = styled.Text`
  font-size: 24px;
  padding-right: 20px;
`;

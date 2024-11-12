import NoticeItem from "./NoticeItem";
import styled from "styled-components/native";
import IconContainer from "./IconContainer";
import { ImageProps, TextProps, View, ViewProps } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

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

  const homeIcon = require("../assets/images/home.png");
  const profileIcon = require("../assets/images/profile.png");
  const plateIcon = require("../assets/images/plate.png");

  return (
    <Container>
      <StyledScrollView>
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
        <RowContainer>
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
        </RowContainer>
        <NoticeRow>
          <ImageStyled source={require("../assets/images/megaphone.png")} />
          <NoticeBoardText>{"공지사항"}</NoticeBoardText>
        </NoticeRow>
        <NoticeItem
          date=" 24.10.13 "
          restaurant="경성카츠"
          content="오늘 왕돈가스 품절됐습니다 ㅠㅠ"
          image={notice1}
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
  margin: 0 20px 20px;
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
`;
const NameRow = styled(Row)`
  align-items: baseline;
`;
const NoticeBoardText = styled.Text`
  font-size: 22px;
  padding-right: 20px;
`;

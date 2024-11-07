import React from "react";
import { SafeAreaView, ScrollView, Text, Image, View } from "react-native";
import styled from "styled-components/native";
import Logo from "./Logo";
import Button from "./Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type LoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function Login({ navigation }: LoginProps) {
  const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    gap: 40px;
  `;

  const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #e8e8e899;
    border-radius: 20px;
    padding: 15px;
    /* margin: 0 38px 20px; */
    gap: 20px;
    width: 100%;
  `;

  const Input = styled.TextInput`
    font-size: 16px;
    height: 100%;
  `;

  const StyledImage = styled.Image`
    width: 35px;
    height: 35px;
  `;
  const Inputs = styled.View`
    gap: 15px;
    width: 100%;
    padding: 0 50px;
  `;

  const ButtonContainer = styled.View`
    width: 100%;
    padding: 0 50px;
    gap: 10px;
  `;
  return (
    <Container>
      <Logo />
      <Inputs>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/emailIcon.png")}
            resizeMode="contain"
          />
          <Input placeholder="이메일" keyboardType="email-address" />
        </InputContainer>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/pwIcon.png")}
            resizeMode="contain"
          />
          <Input placeholder="비밀번호" secureTextEntry={true} />
        </InputContainer>
      </Inputs>
      <ButtonContainer>
        <Button
          title="로그인"
          screen="Login"
          navigation={navigation}
          buttonColor=" #435fff"
        />

        <Button
          title="회원가입"
          screen="Signup"
          navigation={navigation}
          buttonColor=" #435fff"
        />
      </ButtonContainer>
      {/* <FooterText>아이디/비밀번호 찾기</FooterText> */}
    </Container>
  );
}

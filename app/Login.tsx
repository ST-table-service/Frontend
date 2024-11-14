import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import Logo from "./Logo";
import Button from "./Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useState } from "react";
import axios from "axios";

type LoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Styled components를 컴포넌트 외부로 이동
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
  gap: 20px;
  width: 100%;
`;

const Input = styled.TextInput`
  font-size: 16px;
  height: 100%;
  flex: 1;
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

const LoadingText = styled.Text`
  color: #435fff;
  font-size: 14px;
  text-align: center;
`;

const BASE_URL = "서버_BASE_URL"; // 실제 서버 URL로 교체 필요

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    // 입력값 검증
    if (!email || !password) {
      Alert.alert("알림", "모든 필드를 입력해주세요.");
      return;
    }

    // 이메일 형식 검증
    if (!validateEmail(email)) {
      Alert.alert("알림", "올바른 이메일 형식이 아닙니다.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password,
      });

      // 로그인 성공 시
      if (response.data.token) {
        Alert.alert("알림", "로그인 성공", [
          {
            text: "확인",
            onPress: () => navigation.navigate("HomeStack"),
          },
        ]);
      }
    } catch (error: any) {
      let errorMessage = "로그인 중 오류가 발생했습니다.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Alert.alert("오류", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Logo />
      <Inputs>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/emailIcon.png")}
            resizeMode="contain"
          />
          <Input
            placeholder="이메일"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </InputContainer>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/pwIcon.png")}
            resizeMode="contain"
          />
          <Input
            placeholder="비밀번호"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </InputContainer>
      </Inputs>
      <ButtonContainer>
        <Button
          title={isLoading ? "로그인 중..." : "로그인"}
          screen="HomeStack"
          navigation={navigation}
          buttonColor="#435fff"
          onPress={handleLogin}
        />
        <Button
          title="회원가입"
          screen="Signup"
          navigation={navigation}
          buttonColor="#435fff"
        />
      </ButtonContainer>
      {isLoading && <LoadingText>잠시만 기다려주세요...</LoadingText>}
    </Container>
  );
}

import styled from "styled-components/native";
import Logo from "./Logo";
import Button from "./Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import axios from "axios";

type SignupProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const API_KEY = "부여받은 API키"; // 실제 API 키로 교체 필요
const BASE_URL = "서버_BASE_URL"; // 실제 서버 URL로 교체 필요

// ... (이전 타입 정의와 스타일 컴포넌트는 동일)

export default function Signup({ navigation }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  // 이메일 중복 확인
  const checkEmailDuplicate = async () => {
    if (!email) {
      Alert.alert("알림", "이메일을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/check-email`, { email });
      if (response.data.isDuplicate) {
        Alert.alert("알림", "이미 사용 중인 이메일입니다.");
      } else {
        Alert.alert("알림", "사용 가능한 이메일입니다.");
        setIsEmailVerified(true);
      }
    } catch (error) {
      Alert.alert("오류", "이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 인증번호 요청
  const requestVerificationCode = async () => {
    if (!isEmailVerified) {
      Alert.alert("알림", "먼저 이메일 중복 확인을 해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/request-verification`, {
        key: API_KEY,
        email: email,
        univName: "서울과학기술대학교",
        univ_check: false,
      });

      setIsCodeSent(true);
      Alert.alert("알림", "인증번호가 이메일로 전송되었습니다.");
    } catch (error) {
      Alert.alert("오류", "인증번호 전송 중 오류가 발생했습니다.");
    }
  };

  // 인증번호 확인
  const verifyCode = async () => {
    if (!verificationCode) {
      Alert.alert("알림", "인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/verify-code`, {
        key: API_KEY,
        email: email,
        univName: "서울과학기술대학교",
        code: parseInt(verificationCode),
      });

      if (response.data.isVerified) {
        Alert.alert("알림", "인증이 완료되었습니다.");
        setIsCodeVerified(true);
      } else {
        Alert.alert("알림", "잘못된 인증번호입니다.");
      }
    } catch (error) {
      Alert.alert("오류", "인증번호 확인 중 오류가 발생했습니다.");
    }
  };

  // 회원가입
  const handleSignup = async () => {
    // 입력값 검증
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("알림", "모든 필드를 입력해주세요.");
      return;
    }

    if (!isEmailVerified) {
      Alert.alert("알림", "이메일 중복 확인을 해주세요.");
      return;
    }

    if (!isCodeVerified) {
      Alert.alert("알림", "이메일 인증을 완료해주세요.");
      return;
    }

    if (!passwordMatch) {
      Alert.alert("알림", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        name: name,
        email: email,
        password: password,
        role: "STUDENT",
      });

      Alert.alert("알림", "회원가입이 완료되었습니다.", [
        { text: "확인", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert("오류", "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Logo />
      <Inputs>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/nameIcon.png")}
            resizeMode="contain"
          />
          <Input placeholder="이름" value={name} onChangeText={setName} />
        </InputContainer>
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
          />
          <ValidateButton onPress={checkEmailDuplicate}>
            <ValidateButtonText>중복확인</ValidateButtonText>
          </ValidateButton>
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
          />
        </InputContainer>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/pwIcon.png")}
            resizeMode="contain"
          />
          <Input
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </InputContainer>
        {!passwordMatch && confirmPassword !== "" && (
          <Text style={{ color: "red", marginLeft: 10 }}>
            비밀번호가 일치하지 않습니다.
          </Text>
        )}
      </Inputs>
      <ButtonContainer>
        <VerificationContainer>
          <ValidationKey
            placeholder="인증번호를 입력하세요"
            keyboardType="numeric"
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={{ flex: 1 }}
          />
          <VerifyCodeButton onPress={verifyCode}>
            <VerifyCodeButtonText>확인</VerifyCodeButtonText>
          </VerifyCodeButton>
        </VerificationContainer>
        <Button
          title="인증번호 받기"
          onPress={requestVerificationCode}
          screen="Signup"
          navigation={navigation}
        />
        <Button
          title="가입하기"
          onPress={handleSignup}
          screen="Signup"
          navigation={navigation}
          buttonColor="#435fff"
        />
      </ButtonContainer>
    </Container>
  );
}
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

const ValidateButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #435fff;
  border-radius: 5px;
  padding: 10px 10px;
`;
const ValidateButtonText = styled.Text`
  color: #ffffff;
  font-size: 12px;
`;

const ValidationKey = styled.TextInput`
  text-align: center;
  border-bottom-width: 1px;
  border-bottom-color: #435fff; /* 원하는 색상으로 변경 가능 */
  margin: 0 30px 10px 30px;
  font-size: 18px;
`;

const VerificationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const VerifyCodeButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #435fff;
  border-radius: 5px;
  padding: 10px 15px;
`;

const VerifyCodeButtonText = styled.Text`
  color: #ffffff;
  font-size: 12px;
`;

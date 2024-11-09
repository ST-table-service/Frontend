import styled from "styled-components/native";
import Logo from "./Logo";
import Button from "./Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type SignupProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function Signup({ navigation }: SignupProps) {
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

  return (
    <Container>
      <Logo />
      <Inputs>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/nameIcon.png")}
            resizeMode="contain"
          />
          <Input placeholder="이름" />
        </InputContainer>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/emailIcon.png")}
            resizeMode="contain"
          />
          <Input placeholder="이메일" keyboardType="email-address" />
          <ValidateButton>
            <ValidateButtonText>중복확인</ValidateButtonText>
          </ValidateButton>
        </InputContainer>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/pwIcon.png")}
            resizeMode="contain"
          />
          <Input placeholder="비밀번호" secureTextEntry={true} />
        </InputContainer>
        <InputContainer>
          <StyledImage
            source={require("../assets/images/pwIcon.png")}
            resizeMode="contain"
          />
          <Input placeholder="비밀번호 확인" secureTextEntry={true} />
        </InputContainer>
      </Inputs>
      <ButtonContainer>
        <ValidationKey
          placeholder="인증번호를 입력하세요"
          keyboardType="numeric" // 숫자 키패드 표시
        />
        <Button title="인증번호 받기" navigation={navigation} screen="Signup" />

        <Button
          title="가입하기"
          navigation={navigation}
          screen="Signup"
          buttonColor="#435fff"
        />
      </ButtonContainer>
      {/* <FooterText>아이디/비밀번호 찾기</FooterText> */}
    </Container>
  );
}

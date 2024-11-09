import styled from "styled-components/native";
import Logo from "./Logo";
export default function Header() {
  const Container = styled.View`
    background-color: white;
  `;
  const Divider = styled.View`
    height: 1px;
    background-color: #bcbcbc;
  `;

  const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 26px;
  `;

  const StyledImage = styled.Image`
    width: 30px;
    height: 30px;
  `;

  const TextLogo = styled.Text`
    font-size: 36px;
  `;
  return (
    <Container>
      <HeaderContainer>
        <StyledImage
          source={require("../assets/images/hamburgerIcon.png")}
          resizeMode="stretch"
        />
        <Logo header={true} />
        <StyledImage
          source={require("../assets/images/bellIcon.png")}
          resizeMode="stretch"
        />
      </HeaderContainer>
      <Divider />
    </Container>
  );
}

import React from "react";
import styled from "styled-components/native";
import Logo from "./Logo";
export default function Header() {
  const Divider = styled.View`
    height: 1px;
    background-color: #bcbcbc;
  `;

  const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 12px 26px;
  `;

  const StyledImage = styled.Image`
    width: 30px;
    height: 30px;
  `;

  const TextLogo = styled.Text`
    font-size: 36px;
  `;
  return (
    <>
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
    </>
  );
}

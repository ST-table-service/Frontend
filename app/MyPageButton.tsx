import React, { Children, ReactNode } from "react";
import styled from "styled-components/native";
interface MyPageButtonProps {
  content?: string;
  children: ReactNode;
}

export default function MyPageButton({ children }: MyPageButtonProps) {
  const MyPageButton = styled.TouchableOpacity`
    width: 180px;
    height: 80px;
    background-color: #435fff;
    border-color: #ffffff;
    border-radius: 10px;
    border-width: 1px;
    padding: 21px 0;
  `;

  return <MyPageButton>{children}</MyPageButton>;
}

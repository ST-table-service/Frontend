import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface LogoProps {
  header?: boolean;
}

export default function Logo({ header }: LogoProps) {
  const isHeader = header;
  const LogoContainer = styled.View`
    /* width: 100%; */
    flex-direction: row;
    justify-content: center;
  `;

  const LogoText = styled.Text<{ isHeader?: boolean }>`
    font-size: ${(props) => (props.isHeader ? "40px" : "75px")};
    text-align: center;
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  const SText = styled(LogoText)`
    color: #b90005;
  `;

  const TText = styled(LogoText)`
    color: #0a1e62;
  `;

  const ColonText = styled(LogoText)`
    color: #8f8f8f;
  `;

  const TableText = styled(LogoText)`
    color: #d1d5db;
  `;
  return (
    <LogoContainer>
      <TouchableOpacity
        style={{
          flexDirection: "row",
        }}
      >
        <SText isHeader={header}>S</SText>
        <TText isHeader={header}>T</TText>
        <ColonText isHeader={header}>:</ColonText>
        <TableText isHeader={header}>table</TableText>
      </TouchableOpacity>
    </LogoContainer>
  );
}

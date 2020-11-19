import React from "react";
import { WrapperStyled } from "./general/general.styles";
import styled from "styled-components";
import { auth } from "./firebase";

const PlaceholderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Placeholder: React.FC = () => {
  return (
    <WrapperStyled>
      <PlaceholderWrapper>
        An email is been sent to register a password for your account, please
        check your inbox to complete the registration.
      </PlaceholderWrapper>
    </WrapperStyled>
  );
};

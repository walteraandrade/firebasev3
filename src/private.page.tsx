import React from "react";
import { useAuthProvider } from "./auth.context";
import { WrapperStyled } from "./general/general.styles";

export const PrivatePage: React.FC = () => {
  const { logout } = useAuthProvider();

  return (
    <WrapperStyled>
      <button onClick={logout}>Logout</button>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Creation_of_Adam_%28Michelangelo%29_Detail.jpg/1200px-Creation_of_Adam_%28Michelangelo%29_Detail.jpg"
        alt="creating of men"
      />
    </WrapperStyled>
  );
};

import React from "react";
import { useAuthProvider } from "./auth.context";
import { useFlashMessage } from "./flash-message/flash-message.context";
import { FlashMessageType } from "./flash-message/flash-message.style";
import { WrapperStyled } from "./general/general.styles";

export const PrivatePage: React.FC = () => {
  const { logout } = useAuthProvider();

  const { showFlashMessage } = useFlashMessage();

  return (
    <WrapperStyled>
      <button onClick={logout}>Logout</button>
      <button
        onClick={() => showFlashMessage("teste", FlashMessageType.WARNING)}
      >
        Show flash message
      </button>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Creation_of_Adam_%28Michelangelo%29_Detail.jpg/1200px-Creation_of_Adam_%28Michelangelo%29_Detail.jpg"
        alt="creating of men"
      />
    </WrapperStyled>
  );
};

import React from "react";
import { AppStyled } from "./app.style";
import { AuthProvider } from "./auth.context";
import { FlashMessageProvider } from "./flash-message/flash-message.context";
import { Routes } from "./Routes";

const App: React.FC = () => {
  return (
    <FlashMessageProvider>
      <AuthProvider>
        <AppStyled>
          <Routes />
        </AppStyled>
      </AuthProvider>
    </FlashMessageProvider>
  );
};

export default App;

import React, { useState } from "react";
import { FlashMessage } from "./flash-message.component";
import { FlashMessageType } from "./flash-message.style";

const sixSecondsTimer = 6000;

interface FlashMessageContext {
  showFlashMessage(message: string, type?: FlashMessageType): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlashMessageProviderContext = React.createContext<any>(undefined);
FlashMessageProviderContext.displayName = "FlashMessageContext";

export const FlashMessageProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<string | undefined>(
    undefined
  );

  const [messageType, setMessageType] = useState<FlashMessageType | undefined>(
    undefined
  );
  const showFlashMessage = (message: string, type: FlashMessageType): void => {
    setFlashMessage(message);
    setMessageType(type);
    setTimeout(() => setFlashMessage(undefined), sixSecondsTimer);
    clearTimeout(sixSecondsTimer);
  };

  return (
    <FlashMessageProviderContext.Provider value={{ showFlashMessage }}>
      <FlashMessage
        show={flashMessage !== undefined}
        message={flashMessage as string}
        type={messageType}
      />
      {children}
    </FlashMessageProviderContext.Provider>
  );
};

export const useFlashMessage = (): FlashMessageContext => {
  const context = React.useContext(FlashMessageProviderContext);
  if (context === undefined) {
    throw new Error(
      "useFlashMessage must be used within a FlashMessageContextProvider"
    );
  }
  return context;
};

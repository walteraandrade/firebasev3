import React from "react";
import { FlashMessageType, FlashMessageWrapper } from "./flash-message.style";

export interface FlashMessageProps {
  message: string;
  show: boolean;
  type?: FlashMessageType | undefined;
}

export const FlashMessage: React.FC<FlashMessageProps> = ({
  message,
  show,
  type,
}) => (
  <FlashMessageWrapper show={show} type={type ? type : FlashMessageType.ERROR}>
    <span>{message}</span>
  </FlashMessageWrapper>
);

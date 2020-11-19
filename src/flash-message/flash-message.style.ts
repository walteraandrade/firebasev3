import styled from "styled-components";
import { Color, Spacing, Radius } from "../general/constants";

export enum FlashMessageType {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

interface FlashMessageStyledProps {
  show: boolean;
  type?: FlashMessageType;
}

const flashMessageTypes = {
  error: Color.Alert,
  warning: Color.Warning,
  success: Color.Success,
};

export const FlashMessageWrapper = styled.div<FlashMessageStyledProps>`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  min-width: 50%;
  font-weight: bold;
  color: lightcyan;
  background-color: ${(props) =>
    props.type ? flashMessageTypes[props.type] : Color.Warning};
  text-align: center;
  padding: ${Spacing.Medium};
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  margin: ${Spacing.XXLarge};
  top: 50%;
  border-radius: ${Radius.Small};
`;

import React from "react";
import { Link } from "react-router-dom";
import { useAuthProvider } from "./auth.context";
import { useFlashMessage } from "./flash-message/flash-message.context";
import {
  FormStyled,
  ButtonStyled,
  WrapperStyled,
  CardStyled,
} from "./general/general.styles";
import { Input } from "./general/input.component";

export const Login: React.FC = () => {
  const emailRef = React.useRef<any>();
  const passwordRef = React.useRef<any>();

  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const { showFlashMessage } = useFlashMessage();
  const { login } = useAuthProvider();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to login!");
    }
    setLoading(false);
  };

  return (
    <WrapperStyled>
      {error && showFlashMessage(error)}
      <CardStyled>
        Login
        <FormStyled onSubmit={handleSubmit}>
          <Input placeholder="email" type="email" reference={emailRef} />
          <Input
            placeholder="password"
            type="password"
            reference={passwordRef}
          />
          <ButtonStyled type="submit" disabled={loading}>
            Submit
          </ButtonStyled>
        </FormStyled>
        <Link to="/signup">Need an account?</Link>
      </CardStyled>
    </WrapperStyled>
  );
};

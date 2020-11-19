import React from "react";
import { Link } from "react-router-dom";
import { useAuthProvider } from "./auth.context";
import { useFlashMessage } from "./flash-message/flash-message.context";
import {
  ButtonStyled,
  CardStyled,
  FormStyled,
  WrapperStyled,
} from "./general/general.styles";
import { Input } from "./general/input.component";

export const SignUp: React.FC = () => {
  const emailRef = React.useRef<any>();
  const passwordRef = React.useRef<any>();
  const passwordConfirmRef = React.useRef<any>();

  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { showFlashMessage } = useFlashMessage();
  const { signUp, signUpWithEmailOnly } = useAuthProvider();

  const signUpWithPassword = async () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account!");
    }
    setLoading(false);
  };

  const signUpWithoutPassword = async (email: string) => {
    try {
      await signUpWithEmailOnly(email);
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordRef.current.value === "") {
      signUpWithoutPassword(emailRef.current.value);
    } else {
      signUpWithPassword();
    }
  };

  return (
    <WrapperStyled>
      <CardStyled>
        {error && showFlashMessage(error)}
        <FormStyled onSubmit={handleSubmit}>
          <Input
            placeholder="email"
            type="email"
            name="email"
            reference={emailRef}
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            reference={passwordRef}
          />
          <Input
            placeholder="confirm password"
            type="password"
            name="confirmPassword"
            reference={passwordConfirmRef}
          />
          <ButtonStyled type="submit" disabled={loading}>
            Submit
          </ButtonStyled>
        </FormStyled>
        <Link to="/">Alread have an accout?</Link>
      </CardStyled>
    </WrapperStyled>
  );
};

import React, { useContext } from "react";
import { auth } from "./firebase";
import { useFlashMessage } from "./flash-message/flash-message.context";
import { FlashMessageType } from "./flash-message/flash-message.style";

interface ContextValueType {
  currentUser: firebase.default.User | null;
  signUp: (user: string, email: string) => Promise<any>;
  login: (
    user: string,
    email: string
  ) => Promise<firebase.default.auth.UserCredential>;
  logout: () => Promise<void>;
  signUpWithEmailOnly: (email: string) => Promise<void>;
}

const AuthContext = React.createContext({} as ContextValueType);

export const AuthProvider: React.FC = ({ children }) => {
  const [
    currentUser,
    setCurrentUser,
  ] = React.useState<firebase.default.User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { showFlashMessage } = useFlashMessage();
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://localhost:3000/placeholder",
    // This must be true.
    handleCodeInApp: true,
  };

  const signUpWithEmailOnly = async (email: string) => {
    await auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function () {
        showFlashMessage(
          "Email successfully sent, please check your inbox and proceed with the registration.",
          FlashMessageType.SUCCESS
        );
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch(function (error) {
        // Some error occurred, you can inspect the code: error.code
        showFlashMessage(error.code, FlashMessageType.ERROR);
      });
  };

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

      return unsubscribe;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, signUp, login, signUpWithEmailOnly, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuthProvider() {
  const context = useContext(AuthContext);
  return context;
}

import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuthProvider } from "./auth.context";
import { auth } from "./firebase";
import { useFlashMessage } from "./flash-message/flash-message.context";
import { FlashMessageType } from "./flash-message/flash-message.style";
import { LoginRoutes } from "./login.routes";
import { PrivateRoutes } from "./private.routes";

export const Routes: React.FC = (): any => {
  const history = useHistory();
  const { currentUser } = useAuthProvider();

  const { showFlashMessage } = useFlashMessage();

  React.useEffect(() => {
    // Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      auth.sendPasswordResetEmail(email as string);
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        showFlashMessage("You are not ahtorized to access this page");
      }
      // The client SDK will parse the code from the link for you.
      auth
        .signInWithEmailLink(email as string, window.location.href)
        .then(function (result) {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          if (result.additionalUserInfo?.isNewUser) {
            auth.sendPasswordResetEmail(result.user?.email as string);
          }
        })
        .catch(function (error) {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          showFlashMessage(error.code, FlashMessageType.ERROR);
        });
    }
    console.log(currentUser);
  }, []);

  if (currentUser) {
    return <PrivateRoutes />;
  } else {
    return <LoginRoutes />;
  }
};

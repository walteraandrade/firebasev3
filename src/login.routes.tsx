import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./login.page";
import { Placeholder } from "./placeholder.page";
import { SignUp } from "./signup.page";

export const LoginRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/placeholder" component={Placeholder} />
      </Switch>
    </Router>
  );
};

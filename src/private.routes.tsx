import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivatePage } from "./private.page";

export const PrivateRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={PrivatePage} />
      </Switch>
    </Router>
  );
};

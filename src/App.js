import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LayoutHome } from "./components/layout";
import "./App.css";
import Login from "./pages/Login";

import sidebarList from "./utils/sidebarList";

const App = () => {
  // const { user } = useUserContext();
  let user = "123";

  if (user.length === 0) {
    return <Login />;
  } else {
    return (
      <Router>
        <Switch>
          <LayoutHome>
            <Route exact path="/">
              <Home />
            </Route>
            {sidebarList.map((item) => {
              const { path, component, id } = item;
              return (
                <Route key={id} path={path}>
                  {component}
                </Route>
              );
            })}
          </LayoutHome>
        </Switch>
      </Router>
    );
  }
};

export default App;

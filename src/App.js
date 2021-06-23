import React from "react";
import User from "./pages/User";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import clients from "./assets/clients";
function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/user/:id"
            render={({ match }) => (
              <User user={clients.find((p) => p.id === match.params.id)} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

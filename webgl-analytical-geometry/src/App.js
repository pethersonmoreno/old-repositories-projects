import React from "react";
import { Route, HashRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import CubeExample from "./pages/CubeExample";

const App = () => (
    <Router>
        <div>
            <Route path="/" exact component={Home} />
            <Route path="/cube-example" component={CubeExample} />
        </div>
    </Router>
);

export default App;

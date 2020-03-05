import React from "react";
import Layout from "./components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Notes from "./pages/Notes";

function App() {
    return (
        <div className="App">
            <Router>
                <CssBaseline />
                <Layout>
                    <MainContent>
                        <Switch>
                            <Route path="/categories">
                                <Categories />
                            </Route>
                            <Route path="/notes">
                                <Notes />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </MainContent>
                </Layout>
            </Router>
        </div>
    );
}

export default App;

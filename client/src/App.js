import React from "react";
import Layout from "./components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Notes from "./pages/Notes";
import Login from "./pages/Login";

//Testing only - set loggedIn to false if you're trying to see the login form
//Will implement actual functionality when backend authentication is available
const loggedIn = true;

function App() {
    return (
        <div className="App">
            <Router>
                {loggedIn ? (
                    <>
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
                    </>
                ) : (
                    <Login />
                )}
            </Router>
        </div>
    );
}

export default App;

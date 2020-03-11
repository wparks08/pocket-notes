import React from "react";
import Layout from "./components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
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
                                <Route path="/registerUser">
                                    <Register />
                                </Route>
                                <Route path="/loginUser">
                                    <Login />
                                </Route>
                                <Route path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </MainContent>
                    </Layout>
                </Router>
            </Provider>
        </div>
    );
}

export default App;

import React, {useEffect, useState} from "react";
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
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoutes from "./components/PrivateRoutes";
import EditNote from "./pages/EditNote";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}
function App() {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <div className="App">
            <Provider store={store}>
                {!authenticated ? (
                    <Router>
                        <Switch>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/">
                                <Login onAuthenticated={setAuthenticated} />
                            </Route>
                        </Switch>
                    </Router>
                ) : (
                    <Router>
                        <CssBaseline />
                        <Layout>
                            <MainContent>
                                <Switch>
                                    <PrivateRoutes exact path="/categories/:categoryID" component={Notes} />
                                    <PrivateRoutes exact path="/categories" component={Categories} />
                                    <PrivateRoutes exact path="/notes/:id" component={EditNote} />
                                    <PrivateRoutes exact path="/notes" component={Notes} />
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
                )}
            </Provider>
        </div>
    );
}

export default App;

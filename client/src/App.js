import React from "react";
import Layout from "./components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContent from "./components/MainContent";

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <Layout>
                <MainContent>
                    <h3>Main Content</h3>
                </MainContent>
            </Layout>
        </div>
    );
}

export default App;

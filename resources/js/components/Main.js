// Main.js
import React from "react";
import ReactDOM from "react-dom";
import { Box } from "@mui/system";
import Navigation from "./Navigation";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Example from "../pages/Example";
import Home from "../pages/Home";
import Login from "../pages/Login"; // Loginコンポーネントをインポート
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

function Main() {
  return (
    <Box>
      <Navigation></Navigation>
      <Router>
        <QueryClientProvider client={client}>
          <main className={"m-5"}>
            <Switch>
              <Route path="/login" component={Login} /> {/* 新たに追加 */}
              <Route path="/" component={Home} />
            </Switch>
          </main>
          {/* <ReactQueryDevtools></ReactQueryDevtools> */}
        </QueryClientProvider>
      </Router>
    </Box>
  );
}

ReactDOM.render(<Main />, document.getElementById("app"));

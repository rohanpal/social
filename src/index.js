import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.css";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Navbar from "./components/navbar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./utils/AuthRoute";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_USER } from "./redux/types";
import { logout, getUser } from "./redux/actions/userActions";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f4511e"
    },
    secondary: {
      main: "#ff5722"
    }
  },
  typography: {
    useNextVariants: true
  }
});

const token = localStorage.token;
if (token) {
  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logout());
      window.location.href = "/login";
    } else {
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUser());
      console.log("In here");
    }
  } catch (error) {
    console.log(error);
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

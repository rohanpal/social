import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/userActions";
import MyButton from "../utils/MyButtons";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";

class navbar extends Component {
  render() {
    let { authenticated } = this.props;
    return (
      <AppBar>
        <ToolBar className="nav-container">
          {authenticated ? (
            <React.Fragment>
              <MyButton tip="Post a scream" placement="top">
                <AddIcon />
              </MyButton>
              <Link to="/">
                <MyButton tip="Go to home" placement="top">
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tip="Notifications" placement="top">
                <NotificationIcon />
              </MyButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button component={Link} to="/">
                Home
              </Button>
              <Button component={Link} to="/login">
                Login
              </Button>
              <Button component={Link} to="/signup">
                Signup
              </Button>
            </React.Fragment>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});
export default connect(
  mapStateToProps,
  { logout }
)(navbar);

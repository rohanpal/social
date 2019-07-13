import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import monkey from "../../images/log.png";
import TypoGraphy from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styles } from "./styles";
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";

class signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
    errors: {},
    handle: ""
  };
  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmitHandler = async event => {
    event.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUser, this.props.history);
  };

  render() {
    const {
      classes,
      ui: { loading, errors }
    } = this.props;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={monkey} alt="AppIcon" className={classes.icon} />
          <TypoGraphy variant="h5" style={{ marginBottom: 5 }}>
            Signup
          </TypoGraphy>
          <form noValidate onSubmit={this.onSubmitHandler}>
            <TextField
              id="email"
              name="email"
              type="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.onChangeHandler}
              label="Email"
              fullWidth
              helperText={errors.email ? errors.email : null}
              error={errors.email ? true : false}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.onChangeHandler}
              label="Password"
              fullWidth
              helperText={errors.password ? errors.password : null}
              error={errors.password ? true : false}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.onChangeHandler}
              label="Confirm Password"
              fullWidth
              helperText={
                errors.confirmPassword ? errors.confirmPassword : null
              }
              error={errors.confirmPassword ? true : false}
            />
            <TextField
              id="handle"
              name="handle"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.onChangeHandler}
              label="Handle"
              fullWidth
              helperText={errors.handle ? errors.handle : null}
              error={errors.handle ? true : false}
            />
            {errors.message && (
              <TypoGraphy variant="body2" className={classes.customError}>
                Wrong Credentials, please try again
              </TypoGraphy>
            )}
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              color="primary"
              disabled={loading}
            >
              signup
              {loading && (
                <CircularProgress className={classes.spinner} size={30} />
              )}
            </Button>
          </form>
          <small>
            <TypoGraphy variant="body2">
              Already have an account click <Link to="/login">here</Link>
            </TypoGraphy>
          </small>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  ui: state.ui,
  user: state.user
});
export default connect(
  mapStateToProps,
  { signupUser }
)(withStyle(styles)(signup));

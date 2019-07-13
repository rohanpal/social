import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import monkey from "../../images/log.png";
import TypoGraphy from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styles } from "./styles";
import { loginUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";

class login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errors: {}
  };
  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmitHandler = async event => {
    const { email, password } = this.state;
    event.preventDefault();
    const credentials = {
      email: email,
      password: password
    };
    this.props.loginUser(credentials, this.props.history);
  };
  render() {
    const {
      classes,
      ui: { errors },
      ui: { loading }
    } = this.props;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={monkey} alt="AppIcon" className={classes.icon} />
          <TypoGraphy variant="h4" style={{ marginBottom: 20 }}>
            Login
          </TypoGraphy>
          <form
            noValidate
            onSubmit={this.onSubmitHandler}
            className={classes.form}
          >
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
              Login
              {loading && (
                <CircularProgress className={classes.spinner} size={30} />
              )}
            </Button>
          </form>
          <small>
            <TypoGraphy variant="body2">
              don't have an account click <Link to="/signup">here</Link>
            </TypoGraphy>
          </small>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  ui: state.ui
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withStyle(styles)(login));

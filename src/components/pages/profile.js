import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uploadImage, logout } from "../../redux/actions/userActions";
import dayjs from "dayjs";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import AddDetails from "../addDetails";
import MyButton from "../../utils/MyButtons";

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 150,
      height: 150,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
        fontSize: 15
      },
      "& a": {
        color: theme.palette.secondary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  },
  details: {
    float: "right"
  }
});
class Profile extends Component {
  handleImageChange = async event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("profileImage");
    fileInput.click();
  };
  render() {
    const {
      classes,
      user: {
        authenticated,
        profile: { handle, createdAt, bio, website, location, imageUrl },
        loading
      }
    } = this.props;
    return loading ? (
      <p>loading...</p>
    ) : authenticated ? (
      <Fragment>
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="Profile" className="profile-image" />
              <input
                type="file"
                id="profileImage"
                onChange={this.handleImageChange}
                hidden="hidden"
              />
              <MyButton
                tip="Change profile"
                placement="top-start"
                onClick={this.handleEditPicture}
                btnClass={"button"}
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />

            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              {location && (
                <Fragment>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                </Fragment>
              )}
              <div>
                {website && (
                  <Fragment>
                    <LinkIcon color="primary" />
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 20 }}
                    >
                      {" "}
                      {website}
                    </a>
                  </Fragment>
                )}
              </div>
              <hr />
              <CalendarToday color="secondary" />{" "}
              <span>Joined on {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <MyButton tip="logout" placement="top" onClick={this.props.logout}>
              <KeyboardReturn color="primary" />
            </MyButton>
            <span className={classes.details}>
              <AddDetails />
            </span>
          </div>
        </Paper>
      </Fragment>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2">
          No profile found, please login again
        </Typography>
        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>{" "}
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { uploadImage, logout }
)(withStyles(styles)(Profile));

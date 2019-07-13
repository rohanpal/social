import React, { useState } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/styles/withStyles";
import { addUserDetails } from "../redux/actions/userActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

import EditIcon from "@material-ui/icons/Edit";
import MyButton from "../utils/MyButtons";

const styles = theme => ({
  ...theme
});
const addDetails = ({ classes, profile, addUserDetails }) => {
  const [bio, setBio] = useState("");
  const [website, setwebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    const { bio, website, location } = profile;
    console.log(bio);
    if (bio) {
      setBio(bio);
    }
    if (website) {
      setwebsite(website);
    }
    if (location) {
      setLocation(location);
    }

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeHandler = event => {
    if (event.target.name === "bio") {
      setBio(event.target.value);
    }
    if (event.target.name === "location") {
      setLocation(event.target.value);
    }
    if (event.target.name === "website") {
      setwebsite(event.target.value);
    }
  };
  const handleSubmit = () => {
    addUserDetails({ bio, location, website });
    setOpen(false);
  };
  return (
    <React.Fragment>
      <MyButton tip="Add details" placement="top" onClick={handleOpen}>
        <EditIcon color="primary" />
      </MyButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Add details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="bio"
            id="bio"
            label="Enter your short bio"
            type="text"
            onChange={changeHandler}
            value={bio}
            fullWidth
          />
          <TextField
            margin="dense"
            name="website"
            id="website"
            label="Website"
            type="text"
            onChange={changeHandler}
            value={website}
            fullWidth
          />
          <TextField
            margin="dense"
            name="location"
            id="location"
            label="location"
            type="text"
            onChange={changeHandler}
            value={location}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile
});
export default connect(
  mapStateToProps,
  { addUserDetails }
)(addDetails);

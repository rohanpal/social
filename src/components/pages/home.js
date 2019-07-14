import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import Scream from "../../components/Screams";
import CircularProgress from "@material-ui/core/CircularProgress";
import Profile from "./profile";
import "./home.css";
import { connect } from "react-redux";
import { getAllScreams } from "../../redux/actions/dataActions";
class Home extends Component {
  componentDidMount() {
    this.props.getAllScreams();
  }
  render() {
    let { screams, loading } = this.props.data;
    let displayData = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <CircularProgress />
    );
    return (
      <Grid container spacing={3} className="home">
        <Grid item sm={8} xs={12}>
          {displayData}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  data: state.data
});
export default connect(
  mapStateToProps,
  { getAllScreams }
)(Home);

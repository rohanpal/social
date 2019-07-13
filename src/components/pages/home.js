import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "../../components/Screams";
import CircularProgress from "@material-ui/core/CircularProgress";
import Profile from "./profile";
import "./home.css";
class Home extends Component {
  state = {
    screams: null
  };
  async componentDidMount() {
    try {
      const res = await axios.get(
        "https://asia-east2-socialapp-17669.cloudfunctions.net/api/screams"
      );

      if (res) {
        this.setState({
          screams: res.data
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    let displayData = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream key={scream.screamId} scream={scream} />
      ))
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
export default Home;

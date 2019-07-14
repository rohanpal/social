import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography/";
import RelativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import MyButton from "../utils/MyButtons";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../redux/actions/dataActions";
import "./screams.css";

const styles = {
  card: {
    display: "flex",
    marginBottom: 8,
    maxHeight: "40%"
  },
  image: { minWidth: 200 },
  content: { padding: 20, objectFit: "cover" }
};
class Scream extends React.Component {
  screamLiked = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  like = () => {
    this.props.likeScream(this.props.scream.screamId);
  };
  unlike = () => {
    this.props.unLikeScream(this.props.scream.screamId);
  };
  render() {
    console.log(this.screamLiked());
    dayjs.extend(RelativeTime);
    const {
      classes,
      scream: { body, createdAt, handle, totalComments, totalLikes, userImg },
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.screamLiked() ? (
      <MyButton tip="Unlike" onClick={this.unlike}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.like}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    return (
      <Card className={classes.card}>
        <CardMedia image={userImg} className={classes.image} />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${handle}`}
            color="primary"
          >
            {handle}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {body}
          </Typography>
          <Typography variant="caption" color="textPrimary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          <CardActions disableSpacing className="">
            {likeButton}
            <Typography
              variant="subtitle1"
              color="textPrimary"
            >{`${totalLikes} likes`}</Typography>
            <MyButton tip="Comment">
              <ChatIcon color="primary" />
            </MyButton>
            <Typography
              variant="subtitle1"
              color="textPrimary"
            >{`${totalComments} comments`}</Typography>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { likeScream, unLikeScream }
)(withStyles(styles)(Scream));

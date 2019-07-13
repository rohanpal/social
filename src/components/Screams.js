import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";
import RelativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

const styles = {
  card: {
    display: "flex",
    marginBottom: 8
  },
  image: { minWidth: 200 },
  content: { padding: 20, objectFit: "cover" }
};
class Scream extends React.Component {
  render() {
    dayjs.extend(RelativeTime);
    const {
      classes,
      scream: { body, createdAt, handle, totalComments, totalLikes, userImg }
    } = this.props;

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
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);

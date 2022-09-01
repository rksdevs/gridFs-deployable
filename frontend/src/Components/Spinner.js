import React from "react";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    height: "100%",
    minHeight: "300px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    height: "20vw",
    width: "20vw",
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.loading} />
    </div>
  );
}

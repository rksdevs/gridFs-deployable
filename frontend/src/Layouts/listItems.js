import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
export const mainListItems = (
  <div>
    <ListItem component={Link} to="/user/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem component={Link} to="/user/upload">
      <ListItemIcon>
        <CloudUploadIcon />
      </ListItemIcon>
      <ListItemText primary="Upload File" />
    </ListItem>
  </div>
);

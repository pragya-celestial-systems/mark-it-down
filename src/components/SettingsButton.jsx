import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SettingsIcon from "@mui/icons-material/Settings";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useToggleContext } from "../context/ToggleContext";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function SettingsButton() {
  const { toggleDownload, setToggleDownload } = useToggleContext();

  const [state, setState] = React.useState({
    right: false,
  });

  const handleToggleDownload = () => {
    setToggleDownload((prevState) => !prevState);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        background: "#424769",
        height: "100%",
        color: "lightgrey",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon style={{ color: "lightgrey" }} />
            </ListItemIcon>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItemText style={{ color: "lightgrey" }} primary="Home" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EditNoteIcon style={{ color: "lightgrey" }} />
            </ListItemIcon>
            <Link to="/editor" style={{ textDecoration: "none" }}>
              <ListItemText style={{ color: "lightgrey" }} primary="Editor" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FileCopyIcon style={{ color: "lightgrey" }} />
            </ListItemIcon>
            <Link to="/saved" style={{ textDecoration: "none" }}>
              <ListItemText
                style={{ color: "lightgrey" }}
                primary="Saved Files"
              />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleToggleDownload}>
            <ListItemIcon>
              {!toggleDownload ? (
                <CheckBoxIcon style={{ color: "lightgrey" }} />
              ) : (
                <CropSquareIcon style={{ color: "lightgrey" }} />
              )}
            </ListItemIcon>
            <ListItemText
              style={{ color: "lightgrey" }}
              primary="Enable Download"
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider style={{ background: "grey" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon style={{ color: "lightgrey" }} />
            </ListItemIcon>
            <Link to="/docs" style={{ textDecoration: "none" }}>
              <ListItemText
                style={{ color: "lightgrey" }}
                primary="Documentation & Help"
              />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button
          onClick={toggleDrawer("right", true)}
          style={{ color: "white" }}
        >
          <SettingsIcon style={{ color: "lightgrey" }} />
        </Button>
        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

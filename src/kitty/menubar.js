import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListCat from "./listcat";
import EditCat from "./editcat";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Button from "@mui/material/Button";

const drawerWidth = 400;

function MenuBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {[
          { title: "Не забронированные", value: false },
          { title: "Забронированные", value: true },
        ].map((obj, index) => (
          <ListItem
            button
            key={index}
            onClick={() => props.bookedToggle(obj.value)}
            className={props.booked == obj.value ? "changebooking" : ""}
          >
            <ListItemIcon>
              {!obj.value ? <ThumbUpAltIcon /> : <ThumbDownAltIcon />}
            </ListItemIcon>
            <ListItemText primary={obj.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <div className="addkitty" onClick={() => props.toggleCreate("create")}>
          {props.newcatstate == "none" && (
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Добавить котика
            </Button>
          )}
        </div>
        {props.newcatstate == "edit" && (
          <div className="helpedit">
            Редактируем котика {props.infocat.nameCat}
          </div>
        )}
        {props.newcatstate !== "none" && (
          <EditCat
            addCat={props.addCat}
            infocat={props.infocat}
            breeds={props.breeds}
            toggleCreate={props.toggleCreate}
          />
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar color="#70c8e5">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Шеринг котиков
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className="mainscroll"
      >
        <Toolbar />
        {props.loading && (
          <div className="loading">
            <CircularProgress disableShrink />
          </div>
        )}
        {!props.loading && (
          <ListCat
            catlist={props.catlist}
            booking={props.booking}
            handleDrawerToggle={handleDrawerToggle}
          />
        )}
      </Box>
    </Box>
  );
}

MenuBar.propTypes = {
  window: PropTypes.func,
  bookedToggle: PropTypes.func,
};

export default MenuBar;

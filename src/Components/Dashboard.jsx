import React, { useState } from "react";
import '../Styles/Components/Dashboard.css';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Icon } from '@iconify/react';
import AppBar from "@mui/material/AppBar";
import { Outlet } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from "react-router-dom";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [activeButton, setActiveButton] = useState(false);

  const navigate = useNavigate()
  const handleDrawerOpen = () => setOpen(!open);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    switch (buttonId) {
      case 'Dashboard':
        navigate('/');
        break;
      case 'User':
        navigate('/users'); 
        break;
      default:
        break;
    }
  };

  const drawerWidth = 240;
  

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <AppBar
        position="static"
        sx={{
          background: "white",
          width: open ? "calc(100% - 240px)" : "100%",
          marginLeft: open ? drawerWidth + "px" : "0px",
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          // display:{xs:'none',lg:'block'},
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          zIndex: 1,
         
        }}
        variant="persistent"
        anchor="left"
        open={open}
        
      >
        <DrawerHeader sx={{ justifyContent: "center",alignItems: "center" ,background: "#253544",color: "white",borderTopRightRadius:'10%',borderTopLeftRadius:'10%', marginTop:'1px'}}>
            <Icon icon="logos:geekbot" width="50" height="50" />
        </DrawerHeader>
        <div className="sidebar">
          <List className="top-sidebar" sx={{backgroundColor:'#253544',color: "white"}}>
            {["Dashboard", "Offers", "User","Business","Bot"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => handleButtonClick(text)}
                >
                  <ListItemIcon
                    // className={activeButton === text ? "active-icon" : ""}
                    sx={{ color: "white" }}
                  >
                    {index === 0 ? (
                      <DashboardIcon />
                    ) : index === 1 ? (
                      <LocalOfferIcon />
                    ) : index === 2 ? (
                      <PersonIcon />
                    ) : index===3?(
                    <BusinessCenterIcon/>
                    ): index===4?(<SmartToyIcon/>)
                    : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <Box
        component="div"
        sx={{
          border: "1px solid red",
          height: "calc(100% - 64px)",
          overflowY: "scroll",
          width: open ? "calc(100% - 240px)" : "100%",
          marginLeft: open ? drawerWidth + "px" : "0px",
          // position: "static",
          zIndex: 0.5,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

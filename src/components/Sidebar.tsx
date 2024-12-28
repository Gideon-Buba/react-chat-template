import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Home,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{ width: 240, flexShrink: 0 }}
    >
      <IconButton
        onClick={onToggle}
        sx={{ alignSelf: "flex-end", margin: "8px" }}
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemText primary="User Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;

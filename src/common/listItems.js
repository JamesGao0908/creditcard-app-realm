import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import SettingsIcon from '@material-ui/icons/Settings';
// import CreateIcon from '@material-ui/icons/Create';

import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to='/'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Add new card" />
      </ListItem>
    </Link>

    <Link to='/payments'>
      <ListItem button>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="Payments" />
      </ListItem>
    </Link>
  </div>
);
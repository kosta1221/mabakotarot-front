/**
 *
 * Appbar
 *
 */
import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import { useDispatch } from 'react-redux';
import { drawerActions } from '../Drawer/slice';
import { useCreateToggleDrawerUtil } from '../Drawer/utils';
import { useStyles } from './styles';

interface Props {}

export function Appbar(props: Props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const toggleDrawer = useCreateToggleDrawerUtil(dispatch, drawerActions);

  return (
    <div className={`${classes.root} search-app-bar`}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer(true)}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            מה בכותרות
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

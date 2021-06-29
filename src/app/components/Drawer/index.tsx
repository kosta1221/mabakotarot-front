/**
 *
 * Drawer
 *
 */
import * as React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import CompareIcon from '@material-ui/icons/Compare';

import { useDrawerSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDrawer } from './slice/selectors';
import { useCreateToggleDrawerUtil } from './utils';
import { useStyles } from './styles';
import { useRouter } from '../../../utils/useRouter';

interface Props {}

export function Drawer(props: Props) {
  const router = useRouter();
  const classes = useStyles();

  const { actions } = useDrawerSlice();

  const dispatch = useDispatch();
  const { isDrawerDisplayed } = useSelector(selectDrawer);

  const toggleDrawer = useCreateToggleDrawerUtil(dispatch, actions);

  const drawerList = [
    {
      text: 'Headlines',
      icon: <DynamicFeedIcon />,
      onclick: () => {
        router.push('/headlines');
      },
    },
    {
      text: 'Comparsion',
      icon: <CompareIcon />,
      onclick: () => {
        router.push('/');
      },
    },
  ];

  const list = () => (
    <div
      className={classes.right}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {drawerList.map((data, index) => (
          <ListItem button key={data.text} onClick={data.onclick}>
            <ListItemIcon>
              {index === 0 ? <DynamicFeedIcon /> : <CompareIcon />}
            </ListItemIcon>
            <ListItemText primary={data.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isDrawerDisplayed}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(false)}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}

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
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import CompareIcon from '@material-ui/icons/Compare';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import { useDrawerSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDrawer } from './slice/selectors';
import { useCreateToggleDrawerUtil } from './utils';
import { useStyles } from './styles';
import { useRouter } from '../../../utils/useRouter';

interface Props {
  isDrawerDisplayed?: boolean;
  isComparisonOpen?: boolean;
  comparisons?: Array<any>;
}

export function Drawer(props: Props) {
  const router = useRouter();
  const classes = useStyles();

  const { actions } = useDrawerSlice();

  const dispatch = useDispatch();
  const { isDrawerDisplayed, isComparisonOpen, comparisons } = useSelector(
    selectDrawer,
  );

  const toggleDrawer = useCreateToggleDrawerUtil(dispatch, actions);

  const handleClickOnComparison = e => {
    e.stopPropagation();
    dispatch(actions.setIsComparisonOpen(!isComparisonOpen));
  };

  const handleClickOnNewComparison = e => {
    e.stopPropagation();
    console.log(comparisons.length);
    const newCompare = {
      id: comparisons.length + 1,
      text: `השוואה חדשה - ${comparisons.length + 1}`,
      headlines: [],
    };

    const newComparisons = [...comparisons, newCompare];
    dispatch(actions.setComparisons(newComparisons));
    console.log(comparisons);
  };

  const handleRenameClick = e => {
    e.stopPropagation();
    const id = Number(e.currentTarget.id);

    const editedComparison = comparisons.find(element => element.id === id);
    const comparisonNewName = {
      text: 'new name',
      headlines: editedComparison.headlines,
    };

    const newComparisons = [
      ...comparisons.filter(comparison => comparison.id !== id),
      comparisonNewName,
    ];

    dispatch(actions.setComparisons(newComparisons));
  };

  const list = () => (
    <div
      className={classes.right}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.root}>
        <ListItem button onClick={() => router.push('/headlines')}>
          <ListItemIcon>
            <DynamicFeedIcon />
          </ListItemIcon>
          <ListItemText primary={'כותרות'} className={classes.rightText} />
        </ListItem>
        <ListItem button onClick={e => handleClickOnComparison(e)}>
          <ListItemIcon>
            <CompareIcon />
          </ListItemIcon>
          <ListItemText
            primary={'השוואת כותרות'}
            className={classes.rightText}
          />
          {isComparisonOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isComparisonOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {comparisons?.length > 0 &&
              comparisons.map((item, i) => (
                <ListItem button key={i}>
                  <ListItemText
                    primary={item.text}
                    className={classes.rightText}
                  />
                  <EditIcon
                    id={item.id}
                    className={classes.hoverRename}
                    onClick={e => handleRenameClick(e)}
                  />
                </ListItem>
              ))}
            <ListItem
              button
              className={classes.nested}
              onClick={e => handleClickOnNewComparison(e)}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="הוספת השוואה" />
            </ListItem>
          </List>
        </Collapse>
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

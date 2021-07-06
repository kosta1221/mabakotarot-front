/**
 *
 * Drawer
 *
 */
import * as React from 'react';

import styled from 'styled-components/macro';
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
// import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import EdiText from 'react-editext';

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
  const {
    isDrawerDisplayed,
    isComparisonOpen,
    comparisons,
    editing,
  } = useSelector(selectDrawer);

  const toggleDrawer = useCreateToggleDrawerUtil(dispatch, actions);

  const handleClickOnCollapse = e => {
    e.stopPropagation();
    dispatch(actions.setIsComparisonOpen(!isComparisonOpen));
  };

  const handleClickOnComparison = (event, id) => {
    event.stopPropagation();
    console.log(event.target.type);
    if (event.target.type === 'button' || event.target.type === 'text') {
      return;
    }
    router.push(`/compare?id=${id}`);
    router.history.go(0);
  };

  const handleClickOnNewComparison = e => {
    e.stopPropagation();

    const newCompare = {
      id: comparisons.length + 1,
      text: `השוואה חדשה - ${comparisons.length + 1}`,
      headlines: [],
    };

    const newComparisons = [...comparisons, newCompare];
    dispatch(actions.setComparisons(newComparisons));
    console.log(comparisons);
  };

  const handleSave = (value, inputProps) => {
    const id = Number(inputProps.id);

    const editedComparison = comparisons.find(element => element.id === id);
    const comparisonNewName = {
      id: editedComparison?.id,
      text: value,
      headlines: editedComparison?.headlines,
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
        <ListItem
          button
          onClick={() => {
            router.push('/');
            router.history.go(0);
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'דף הבית'} className={classes.rightText} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            router.push('/headlines');
            router.history.go(0);
          }}
        >
          <ListItemIcon>
            <DynamicFeedIcon />
          </ListItemIcon>
          <ListItemText primary={'כותרות'} className={classes.rightText} />
        </ListItem>
        <ListItem button onClick={e => handleClickOnCollapse(e)}>
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
              comparisons.map((comparison, i) => (
                <ListItem
                  button
                  key={i}
                  id={comparison.id}
                  onClick={event =>
                    handleClickOnComparison(event, comparison.id)
                  }
                >
                  <ListItemText>
                    <StyledEdiText
                      value={comparison.text}
                      type="text"
                      onSave={handleSave}
                      editing={editing}
                      inputProps={{ id: comparison.id }}
                    />
                  </ListItemText>
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
              <ListItemText
                primary="הוספת השוואה"
                className={classes.rightText}
              />
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

const StyledEdiText = styled(EdiText)`
  div[editext='view-container'],
  div[editext='edit-container'] {
    justify-content: space-between;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
    font-size: 1.4rem;
    border-radius: 0;
  }

  button[editext='edit-button'] {
    &:hover {
      color: orange;
    }
  }

  button[editext='save-button'] {
    width: 50px;
    color: green;
    border-radius: 60%;

    &:hover {
      background: greenyellow;
    }
  }
  button[editext='cancel-button'] {
    color: red;
    border-radius: 60%;
    &:hover {
      background: crimson;

      color: #fff;
    }
  }
`;

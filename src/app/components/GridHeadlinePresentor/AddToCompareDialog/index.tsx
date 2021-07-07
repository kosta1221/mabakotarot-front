/**
 *
 * AddToCompareDialog
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';

import { selectGridHeadlinePresentorState } from '../slice/selectors';
import { selectDrawer } from '../../Drawer/slice/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { gridHeadlinePresentorActions as actions } from '../slice';

interface Props {
  onClose: (value: number) => void;
}

export function AddToCompareDialog(props: Props) {
  const { onClose } = props;

  const { isDialogOpen } = useSelector(selectGridHeadlinePresentorState);
  const { comparisons } = useSelector(selectDrawer);
  const dispatch = useDispatch();

  const handleListItemClick = (comparisonId: number) => {
    onClose(comparisonId);
  };

  return (
    <StyledDialog
      aria-labelledby="add-to-comparisons-dialog-title"
      open={isDialogOpen}
      style={{ backgroundColor: 'transparent' }}
      onBackdropClick={() => dispatch(actions.setIsDialogOpen(false))}
    >
      <DialogTitle id="add-to-comparisons-dialog-title">בחר השוואה</DialogTitle>
      <List>
        {comparisons.map(comparison => (
          <ListItem
            button
            onClick={() => handleListItemClick(comparison.id)}
            key={comparison.id}
          >
            <ListItemText primary={comparison.text} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick(99)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="הוספת השוואה" />
        </ListItem>
      </List>
    </StyledDialog>
  );
}

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.17);
  }
`;

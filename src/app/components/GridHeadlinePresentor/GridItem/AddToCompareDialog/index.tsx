/**
 *
 * AddToCompareDialog
 *
 */
import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';

import { selectGridItemState } from '../slice/selectors';
import { selectDrawer } from '../../../Drawer/slice/selectors';
import { useSelector } from 'react-redux';

interface Props {
  onClose: (value: number) => void;
}

export function AddToCompareDialog(props: Props) {
  const { onClose } = props;

  const { isDialogOpen, selectedComparison } = useSelector(selectGridItemState);
  const { comparisons } = useSelector(selectDrawer);

  const handleClose = () => {
    onClose(selectedComparison);
  };

  const handleListItemClick = (value: number) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="add-to-comparisons-dialog-title"
      open={isDialogOpen}
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
    </Dialog>
  );
}

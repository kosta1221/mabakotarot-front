/**
 *
 * QueryDialog
 *
 */
import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DateTime } from 'luxon';
import { useRouter } from '../../../../utils/useRouter';

import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { appbarActions } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppbar } from '../slice/selectors';

interface Props {}

export function QueryDialog(props: Props) {
  const { isQueryDialogOpen, pickedStartDate, pickedEndDate } = useSelector(
    selectAppbar,
  );
  let router = useRouter();
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(appbarActions.setIsQueryDialogOpen(false));
  };
  console.log('start date: ', pickedStartDate);
  console.log('end date: ', pickedEndDate);

  const onFormSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const body = {};
    formData.forEach((value, property) => (body[property] = value));

    console.log('form data:');
    console.table(body);

    handleDialogClose();

    router.push(
      `/headlines?startDate=${pickedStartDate}&endDate=${pickedEndDate}`,
    );
    router.history.go(0);
  };

  const onChange = date => {
    console.log(date);
    const pickedStartDateFormatted = new DateTime.fromJSDate(date[0]).toFormat(
      'yyyy-MM-dd HH:mm',
    );
    const pickedEndDateFormatted = new DateTime.fromJSDate(date[1]).toFormat(
      'yyyy-MM-dd HH:mm',
    );
    console.log('pickedStartDateFormatted', pickedStartDateFormatted);
    console.log('pickedEndDateFormatted', pickedEndDateFormatted);
    dispatch(appbarActions.setPickedStartDate(pickedStartDateFormatted));
    dispatch(appbarActions.setPickedEndDate(pickedEndDateFormatted));
  };

  return (
    <Dialog
      open={isQueryDialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">בחר תאריך...</DialogTitle>
      <DialogContent>
        <form id="calendar-query-form" onSubmit={onFormSubmit}>
          <DialogContentText>
            בחר תאריך או טווח תאריכים של הכותרות שברצונך לראות
          </DialogContentText>

          <Calendar
            onChange={onChange}
            value={[new Date(pickedStartDate), new Date(pickedEndDate)]}
            maxDate={new Date()}
            minDate={new Date('2021-06-19')}
            selectRange
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          בטל
        </Button>
        <Button
          type="submit"
          form="calendar-query-form"
          //   label="Submit"
          color="primary"
        >
          בחר
        </Button>
      </DialogActions>
    </Dialog>
  );
}

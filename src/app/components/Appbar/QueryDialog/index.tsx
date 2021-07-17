/**
 *
 * QueryDialog
 *
 */
import * as React from 'react';
import 'react-calendar/dist/Calendar.css';

import { DateTime } from 'luxon';
import { useRouter } from '../../../../utils/useRouter';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SitesSelectionGroup } from './SitesSelectionGroup';
import {
  StyledCalendar,
  FlexForm,
  FlexDiv,
  StyledDialogContentText,
  StyledTimePicker,
} from './styles';
import { appbarActions } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppbar } from '../slice/selectors';

interface Props {}

export function QueryDialog(props: Props) {
  const {
    isQueryDialogOpen,
    pickedSites,
    pickedStartDate,
    pickedEndDate,
  } = useSelector(selectAppbar);
  let router = useRouter();
  const dispatch = useDispatch();

  const startJsDate = new Date(pickedStartDate);
  const endJsDate = new Date(pickedEndDate);

  const pickedStartDateTime = new DateTime.fromJSDate(startJsDate).setLocale(
    'he',
  );
  const pickedEndDateTime = new DateTime.fromJSDate(endJsDate).setLocale('he');
  const pickedStartDatePresentable = pickedStartDateTime.toFormat(
    'dd MMM yyyy HH:mm',
  );
  const pickedEndDatePresentable = pickedEndDateTime.toFormat(
    'dd MMM yyyy HH:mm',
  );

  const handleDialogClose = () => {
    dispatch(appbarActions.setIsQueryDialogOpen(false));
  };

  const onFormSubmit = event => {
    event.preventDefault();

    const pickedSitesString = encodeURIComponent(JSON.stringify(pickedSites));

    handleDialogClose();

    router.push(
      `/headlines?sites=${pickedSitesString}&startDate=${pickedStartDate}&endDate=${pickedEndDate}`,
    );
    router.history.go(0);
  };

  const onDateRangePick = (dates: Date[]) => {
    const pickedStartDateFormatted = new DateTime.fromJSDate(dates[0]).toFormat(
      'yyyy-MM-dd HH:mm',
    );
    const pickedEndDateFormatted = new DateTime.fromJSDate(dates[1]).toFormat(
      'yyyy-MM-dd HH:mm',
    );

    dispatch(appbarActions.setPickedStartDate(pickedStartDateFormatted));
    dispatch(appbarActions.setPickedEndDate(pickedEndDateFormatted));
  };

  const onStartHourPick = (hourMinute: string) => {
    const hour = hourMinute.slice(0, 2);
    const minute = hourMinute.slice(3);

    dispatch(
      appbarActions.setPickedStartDate(
        pickedStartDateTime.set({ hour, minute }).toFormat('yyyy-MM-dd HH:mm'),
      ),
    );
  };

  const onEndHourPick = (hourMinute: string) => {
    const hour = hourMinute.slice(0, 2);
    const minute = hourMinute.slice(3);

    dispatch(
      appbarActions.setPickedEndDate(
        pickedEndDateTime.set({ hour, minute }).toFormat('yyyy-MM-dd HH:mm'),
      ),
    );
  };

  return (
    <Dialog
      open={isQueryDialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="form-dialog-title"
      maxWidth={'md'}
    >
      <DialogTitle id="form-dialog-title">
        סינון לפי טווח תאריכים ואתרים
      </DialogTitle>
      <DialogContent>
        <FlexForm id="calendar-query-form" onSubmit={onFormSubmit}>
          <StyledDialogContentText>
            בחר תאריך או טווח תאריכים של הכותרות שברצונך לראות:
          </StyledDialogContentText>

          <StyledCalendar
            onChange={onDateRangePick}
            value={[startJsDate, endJsDate]}
            maxDate={new Date()}
            minDate={new Date('2021-06-19')}
            selectRange
            calendarType="Hebrew"
          />

          <FlexDiv>
            <StyledTimePicker
              onChange={onStartHourPick}
              value={pickedStartDateTime.toFormat('HH:mm')}
              maxDetail="minute"
              format="HH:mm"
              clearIcon={null}
              clockIcon={null}
            />

            <p>-</p>

            <StyledTimePicker
              onChange={onEndHourPick}
              value={pickedEndDateTime.toFormat('HH:mm')}
              maxDetail="minute"
              format="HH:mm"
              clearIcon={null}
              clockIcon={null}
            />
          </FlexDiv>

          <DialogContentText>
            {`מתאריך ${pickedStartDatePresentable.slice(-0, -5)} בשעה
            ${pickedStartDatePresentable.slice(
              12,
            )} - עד לתאריך ${pickedEndDatePresentable.slice(-0, -5)} בשעה
            ${pickedEndDatePresentable.slice(12)}`}
          </DialogContentText>

          <StyledDialogContentText>
            בחר אילו אתרי חדשות להציג:
          </StyledDialogContentText>
          <SitesSelectionGroup />
        </FlexForm>
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

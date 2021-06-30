import styled from 'styled-components/macro';
import DialogContentText from '@material-ui/core/DialogContentText';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

export const StyledCalendar = styled(Calendar)`
  margin-bottom: 10px;
`;

export const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const StyledDialogContentText = styled(DialogContentText)`
  width: 100%;
  text-align: right;
`;

export const StyledTimePicker = styled(TimePicker)`
  direction: ltr;
  & > div {
    width: 50px;
  }
`;

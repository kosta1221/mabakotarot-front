import { createMuiTheme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: red[700],
    },
    background: {
      default: indigo[50],
    },
  },
});

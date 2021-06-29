import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  labelButton: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(
      0.5,
    )}px 0`,
    padding: 0,
    border: 'none',
    background: 'none !important',
  },
  labelChip: {
    [theme.breakpoints.down(500)]: {
      fontSize: '0.65rem',
      height: 26,
    },
  },
  noTransform: {
    textTransform: 'none',
  },
  toggled: {
    background: `${theme.palette.primary.main} !important`,
    color: 'white',
  },
  labelGroup: {
    display: 'block',
  },
  includeExcludeGroup: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '5vh 0',
  },
  dialogText: {
    fontSize: '0.9rem',
  },
  exclusiveToggle: {
    flexGrow: 1,
  },
  dialogBottom: {
    display: 'flex',
    margin: '2vh 0',
  },
  dialogBottomChild: {
    flexGrow: 1,
  },
  icon: {
    [theme.breakpoints.down(500)]: {
      display: 'none',
    },
  },
}));

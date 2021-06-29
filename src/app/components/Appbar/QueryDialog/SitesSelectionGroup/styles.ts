import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  siteButton: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(
      0.5,
    )}px 0`,
    padding: 0,
    border: 'none !important',
    background: 'none !important',
  },
  siteChip: {
    [theme.breakpoints.down(500)]: {
      fontSize: '0.65rem',
      height: 26,
    },
  },
  noTransform: {
    textTransform: 'none',
  },
  sitesGroup: {
    display: 'block',
    marginTop: '1px',
  },
  icon: {
    margin: '0',
    marginLeft: '-6px',
    marginRight: '5px',
    [theme.breakpoints.down(500)]: {
      display: 'none',
    },
  },
  // includeExcludeGroup: {
  //   display: 'flex',
  //   justifyContent: 'space-evenly',
  //   margin: '5vh 0',
  // },
  // dialogText: {
  //   fontSize: '0.9rem',
  // },
  // exclusiveToggle: {
  //   flexGrow: 1,
  // },
  // dialogBottom: {
  //   display: 'flex',
  //   margin: '2vh 0',
  // },
  // dialogBottomChild: {
  //   flexGrow: 1,
  // },
}));

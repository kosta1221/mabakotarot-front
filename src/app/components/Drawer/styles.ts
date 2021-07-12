import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    right: {
      width: 250,
    },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    rightText: {
      textAlign: 'right',
    },
    hoverRename: {
      '&:hover': {
        borderRadius: '50%',
        outline: '2px solid',
        outlineOffset: '4px',
      },
    },
  }),
);

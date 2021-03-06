/**
 *
 * Appbar
 *
 */
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/Today';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components/macro';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './styles';
import { useDispatch } from 'react-redux';
import { drawerActions } from '../Drawer/slice';
import { useCreateToggleDrawerUtil } from '../Drawer/utils';
import { useAppbarSlice } from './slice';
import { QueryDialog } from './QueryDialog';
import { SearchBar } from './SearchBar';
import { UniqueOrNotSwitch } from './UniqueOrNotSwitch';
import { useRouter } from '../../../utils/useRouter';
import { withStyles } from '@material-ui/core/styles';

interface Props {}

const QueryDialogTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'black',
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export function Appbar(props: Props) {
  const classes = useStyles();

  const { actions } = useAppbarSlice();
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleDrawer = useCreateToggleDrawerUtil(dispatch, drawerActions);

  const handleHomePageClick = () => {
    router.push('/');
    router.history.go(0);
  };

  return (
    <div className={`${classes.root} search-app-bar`}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer(true)}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            onClick={handleHomePageClick}
            className={classes.title}
            variant="h6"
            noWrap
          >
            ???? ??????????????
          </Typography>

          <OnlyBigScreensTypography variant="h6" noWrap>
            ???? ???????????? ?????????????????
          </OnlyBigScreensTypography>

          <UniqueOrNotSwitch />

          <SearchBar />

          <QueryDialogTooltip title="?????? ???????????????? ???????? ????????????">
            <IconButton
              aria-label="open calendar dialogue"
              color="inherit"
              onClick={() => {
                dispatch(actions.setIsQueryDialogOpen(true));
              }}
            >
              <CalendarIcon />
            </IconButton>
          </QueryDialogTooltip>

          <QueryDialog />
        </Toolbar>
      </AppBar>
    </div>
  );
}

const OnlyBigScreensTypography = styled(Typography)`
  @media (max-width: 700px) {
    display: none;
  }
`;

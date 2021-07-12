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

import { useStyles } from './styles';
import { useDispatch } from 'react-redux';
import { drawerActions } from '../Drawer/slice';
import { useCreateToggleDrawerUtil } from '../Drawer/utils';
import { useAppbarSlice } from './slice';
import { QueryDialog } from './QueryDialog';
import { SearchBar } from './SearchBar';
import { UniqueOrNotSwitch } from './UniqueOrNotSwitch';
import { useRouter } from '../../../utils/useRouter';

interface Props {}

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
            מה בכותרות
          </Typography>

          <OnlyBigScreensTypography variant="h6" noWrap>
            רק כותרות ייחודיות?
          </OnlyBigScreensTypography>

          <UniqueOrNotSwitch />

          <SearchBar />

          <IconButton
            aria-label="open calendar dialogue"
            color="inherit"
            onClick={() => {
              dispatch(actions.setIsQueryDialogOpen(true));
            }}
          >
            <CalendarIcon />
          </IconButton>

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

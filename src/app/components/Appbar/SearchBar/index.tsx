/**
 *
 * SearchBar
 *
 */
import * as React from 'react';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import { appbarActions } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppbar } from '../slice/selectors';
import { useRouter } from 'utils/useRouter';

import { useStyles } from './styles';

interface Props {}

export function SearchBar(props: Props) {
  const classes = useStyles();

  const router = useRouter();
  const { searchInput } = useSelector(selectAppbar);
  const dispatch = useDispatch();

  const handleSearchInputChange = event => {
    dispatch(appbarActions.setSearchInput(event.target.value));
  };

  const handleSearchSubmit = event => {
    if (event && event.type === 'keypress' && event.key === 'Enter') {
      router.push(`/headlines?search=${searchInput}`);
      router.history.go(0);
    }

    if (event && event.type === 'click') {
      router.push(`/headlines?search=${searchInput}`);
      router.history.go(0);
    }
  };

  return (
    <>
      <div className={classes.search}>
        <IconButton
          className={classes.searchIconButton}
          aria-label="search"
          color="inherit"
          onClick={handleSearchSubmit}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          id="searchInput"
          onChange={handleSearchInputChange}
          onKeyPress={handleSearchSubmit}
          placeholder="חפש בכותרות…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </>
  );
}

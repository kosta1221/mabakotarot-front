/**
 *
 * SearchBar
 *
 */
import * as React from 'react';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { appbarActions } from '../slice';
import { useDispatch } from 'react-redux';

import { useStyles } from './styles';

interface Props {}

export function SearchBar(props: Props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSearchInputChange = event => {
    dispatch(appbarActions.setSearchInput(event.target.value));
  };

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          id="searchInput"
          onChange={handleSearchInputChange}
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

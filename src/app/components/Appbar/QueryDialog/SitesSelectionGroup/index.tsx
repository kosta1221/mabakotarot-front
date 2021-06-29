/**
 *
 * SitesSelectionGroup
 *
 */
import * as React from 'react';

import { useStyles } from './styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Chip from '@material-ui/core/Chip';
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
import LabelIconFilled from '@material-ui/icons/LocalOffer';

import { useDispatch, useSelector } from 'react-redux';
import { appbarActions } from '../../slice';
import { selectAppbar } from '../../slice/selectors';

import { sites as allSites } from '../../../../../utils/sites';

interface Props {}

export function SitesSelectionGroup(props: Props) {
  const dispatch = useDispatch();
  const { pickedSites } = useSelector(selectAppbar);
  const classes = useStyles();

  const handlePickedSitesChange = (event, newSitesTexts: string[]) => {
    dispatch(appbarActions.setPickedSites(newSitesTexts));
  };

  const variantToRender = site => {
    if (pickedSites.find(pickedSite => site === pickedSite)) {
      return 'default';
    } else return 'outlined';
  };

  return (
    <ToggleButtonGroup
      className={classes.labelGroup}
      value={pickedSites}
      onChange={handlePickedSitesChange}
      aria-label="text formatting"
    >
      {allSites.map((site, i) => (
        <ToggleButton
          className={`${classes.labelButton} ${classes.noTransform}`}
          key={`toggle-button-label-${i}`}
          value={site}
          aria-label={site}
          onClick={() => {}}
          color="primary"
        >
          <Chip
            key={`label-${i}`}
            className={`${classes.labelChip} label`}
            label={site}
            onClick={() => {}}
            icon={
              variantToRender(site) === 'outlined' ? (
                <LabelIconFilled fontSize="small" className={classes.icon} />
              ) : (
                <LabelIcon fontSize="small" className={classes.icon} />
              )
            }
            variant={variantToRender(site)}
            color="primary"
          ></Chip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

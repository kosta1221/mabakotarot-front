/**
 *
 * HeadlineSliderPresentor
 *
 */
import * as React from 'react';
// import Loader from 'react-loader-spinner';

// import { DateTime } from 'luxon';

import { useSelector, useDispatch } from 'react-redux';
import { selectSliders } from './slice/selectors';
import { slidersActions, initialSliderState } from './slice';
import { homepageActions } from 'app/pages/HomePage/slice';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import { sites as allSites } from 'utils/sites';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';

import styled from 'styled-components/macro';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { numFormatter, getNumFromHHMM } from 'utils/helpers';

interface Props {
  index: number;
  headlines?: Array<any>;
  lastItem?: any;
  isLoading?: boolean;
  isSortAsc?: boolean;
  sites?: string[] | null;
  handleToggleSortingorder?: any;
}

export function HeadlineSliderPresentor(props: Props) {
  const {
    index,
    headlines,
    sites,
    // isLoading,
  } = props;

  const dispatch = useDispatch();
  const { sliders } = useSelector(selectSliders);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (index > sliders.length - 1) {
    dispatch(slidersActions.setSliders([...sliders, initialSliderState]));
  }

  //   console.log(sliders);

  React.useEffect(() => {
    if (
      headlines &&
      headlines[headlines.length - 1] &&
      headlines[headlines.length - 1].date
    ) {
      // When headlines get fetched, set the showed headline to the first one fetched (most recent)
      const showedHeadline = headlines[0].date.split(' ')[1];
      dispatch(
        slidersActions.setOneSlidersShowedHeadline({
          index,
          showedHeadline,
        }),
      );
    }
  }, [dispatch, index, headlines]);

  React.useEffect(() => {
    sites &&
      sites[0] &&
      dispatch(
        slidersActions.setOneSlidersPickedSite({ index, pickedSite: sites[0] }),
      );
  }, [dispatch, index, sites]);

  const marks = headlines
    ?.filter(
      (headline, i) =>
        headlines.indexOf(headline) === i &&
        sites &&
        headline.site === sites[0],
    )
    .map(headline => {
      const hhmm = headline.date.split(' ')[1];
      // console.log('index: ', index, 'hhmm: ', hhmm);

      const value = getNumFromHHMM(hhmm);

      return {
        value,
        label: null, // hhmm
      };
    });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = site => {
    setAnchorEl(null);
    if (site && typeof site === 'string') {
      dispatch(homepageActions.setSliderByIndex({ index, site }));
    }
  };

  return (
    <div>
      <Typography id="time-slider" onClick={handleClick} gutterBottom>
        {`היום ב- `}
        <Button
          style={{ textTransform: 'none' }}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {`${sliders[index] && sliders[index].pickedSite}:`}
        </Button>
      </Typography>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {allSites.map(site => (
          <MenuItem key={site} onClick={e => handleClose(site)}>
            {site}
          </MenuItem>
        ))}
      </Menu>

      <StyledCard elevation={6}>
        <Image
          src={
            headlines?.filter(
              headline =>
                headline.date.split(' ')[1] === sliders[index]?.showedHeadline,
            )[0]?.imageUrl
          }
          alt={'headline-image'}
        />

        <StyledSlider
          aria-labelledby="time-slider"
          getAriaValueText={numFormatter}
          min={0}
          max={95}
          value={getNumFromHHMM(
            (sliders[index] && sliders[index].showedHeadline) || '',
          )}
          onChange={(e, v) => {
            if (Array.isArray(v)) return;
            dispatch(
              slidersActions.setOneSlidersShowedHeadline({
                index,
                showedHeadline: numFormatter(v),
              }),
            );
          }}
          step={null}
          valueLabelDisplay="on"
          valueLabelFormat={numFormatter}
          marks={marks}
        />
      </StyledCard>
    </div>
  );
}

const Image = styled.img`
  height: auto;
  width: 100%;
  align-self: center;
`;

const StyledCard = styled(Card)`
  border: 1.5px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
  padding: 30px 0 10px 0;
  width: 95%;
`;

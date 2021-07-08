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
import { slidersActions } from './slice';

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
    // lastItem,
    // isLoading,
    // isSortAsc,
    // handleToggleSortingorder,
  } = props;

  const dispatch = useDispatch();
  const { sliders } = useSelector(selectSliders);

  const thisSlider =
    sliders && sliders.filter(slider => slider.index === index)[0];

  //   console.log(thisSlider);

  React.useEffect(() => {
    if (
      headlines &&
      headlines[headlines.length - 1] &&
      headlines[headlines.length - 1].date
    ) {
      // When headlines get fetched, set the showed headline to the first one fetched (most recent)
      const showedHeadline = headlines[0].date.split(' ')[1];
      dispatch(slidersActions.setSlider({ index, showedHeadline }));
    }
  }, [dispatch, headlines, index]);

  const marks = headlines?.map(headline => {
    const hhmm = headline.date.split(' ')[1];
    // console.log('index: ', index, 'hhmm: ', hhmm);

    const value = getNumFromHHMM(hhmm);

    return {
      value,
      label: null, // hhmm
    };
  });

  return (
    <div>
      <Typography id="time-slider" gutterBottom>
        {`היום ב- ${sites && sites[0]}:`}
      </Typography>
      <Image
        src={
          headlines?.filter(
            headline =>
              headline.date.split(' ')[1] === thisSlider?.showedHeadline,
          )[0]?.imageUrl
        }
        alt={'headline-image'}
      />
      <Slider
        aria-labelledby="time-slider"
        getAriaValueText={numFormatter}
        min={0}
        max={95}
        value={getNumFromHHMM((thisSlider && thisSlider.showedHeadline) || '')}
        onChange={(e, v) => {
          if (Array.isArray(v)) return;
          dispatch(
            slidersActions.setSlider({
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
    </div>
  );
}

const Image = styled.img`
  height: auto;
  width: 100%;
  align-self: center;
  border: 2px solid black;
`;

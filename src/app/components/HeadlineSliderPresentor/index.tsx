/**
 *
 * HeadlineSliderPresentor
 *
 */
import * as React from 'react';
import Loader from 'react-loader-spinner';

import { DateTime } from 'luxon';

import { useSelector, useDispatch } from 'react-redux';
import { selectHeadlinesFeedInfiniteScroll } from '../HeadlinesFeedInfiniteScroll/slice/selectors';
import { appbarActions } from '../Appbar/slice';

import styled from 'styled-components/macro';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { numFormatter, getNumFromHHMM } from 'utils/helpers';

interface Props {
  headlines?: Array<any>;
  lastItem?: any;
  isLoading?: boolean;
  isSortAsc?: boolean;
  handleToggleSortingorder?: any;
}

export function HeadlineSliderPresentor(props: Props) {
  const {
    headlines,
    lastItem,
    isLoading,
    isSortAsc,
    handleToggleSortingorder,
  } = props;

  const marks = headlines?.map(headline => {
    const hhmm = headline.date.split(' ')[1];

    const value = getNumFromHHMM(hhmm);

    console.log('label: ', hhmm, 'value: ', value);

    return {
      value,
      label: hhmm,
    };
  });

  return (
    <div>
      <Typography id="discrete-slider-custom" gutterBottom>
        Custom marks
      </Typography>
      <Slider
        aria-labelledby="time-slider"
        getAriaValueText={numFormatter}
        min={0}
        max={95}
        value={marks && marks[0]?.value}
        step={null}
        valueLabelDisplay="on"
        valueLabelFormat={numFormatter}
        marks={marks}
      />
      <Image
        src="https://mabakotarot.s3.amazonaws.com/haaretz/2021-07-04_18-45.webp"
        alt={`headline-`}
      />
    </div>
  );
}

const Image = styled.img`
  height: auto;
  width: 100%;
  align-self: center;
`;

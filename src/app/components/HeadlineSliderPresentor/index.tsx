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

interface Props {
  headlines?: Array<any>;
  lastItem?: any;
  isLoading?: boolean;
  isSortAsc?: boolean;
  handleToggleSortingorder?: any;
}

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function numFormatter(value: number) {
  let mm;
  switch (value % 4) {
    case 0:
      mm = '00';
      break;
    case 1:
      mm = '15';
      break;
    case 2:
      mm = '30';
      break;
    case 3:
      mm = '45';
      break;

    default:
      break;
  }
  return `${pad(Math.floor(value / 4))}:${mm}`;
}

export function HeadlineSliderPresentor(props: Props) {
  const {
    headlines,
    lastItem,
    isLoading,
    isSortAsc,
    handleToggleSortingorder,
  } = props;

  //   const marks = headlines?.map((headline) => {value: headline.date.slice(1, 5), label: headline.date.slice(1, 3)})
  //   const marks = headlines?.map((headline) => {value: headline.date.slice(1, 5), label: headline.date.slice(1, 3)})

  let marks: any[] = [];
  for (let i = 0; i <= 95; i += 12) {
    const formatted = numFormatter(i);
    marks.push({ value: i, label: formatted });
  }

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
        defaultValue={10}
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

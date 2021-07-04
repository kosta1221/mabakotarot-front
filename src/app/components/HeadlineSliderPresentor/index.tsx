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

function valuetext(value: number) {
  return `${value}:00`;
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
  for (let i = 0; i <= 23; i += 3) {
    marks.push({ value: i, label: `${i}:00` });
  }

  return (
    <div>
      <Typography id="discrete-slider-custom" gutterBottom>
        Custom marks
      </Typography>
      <Slider
        min={0}
        max={24}
        defaultValue={10}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={null}
        valueLabelDisplay="on"
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

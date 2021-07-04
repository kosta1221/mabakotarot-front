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

  const marks = headlines?.map(headline => {
    const hhmm = headline.date.split(' ')[1];
    const hour = hhmm.split(':')[0];
    const minute = hhmm.split(':')[1];

    let value = 4 * +hour;

    switch (minute) {
      case '00':
        value += 0;
        break;
      case '15':
        value += 1;
        break;
      case '30':
        value += 2;
        break;
      case '45':
        value += 3;
        break;

      default:
        break;
    }

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

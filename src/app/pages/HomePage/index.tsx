import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Helmet } from 'react-helmet-async';
import { useHomepageSlice } from './slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectHomepage } from './slice/selectors';

export function HomePage() {
  const { actions } = useHomepageSlice();
  const dispatch = useDispatch();
  const homePage = useSelector(selectHomepage);

  console.log(homePage);

  const onChange = date => {
    const newDate = new Date(date);
    dispatch(actions.pick(newDate.toISOString()));
  };

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="App for comparing news headlines" />
      </Helmet>
      <Calendar onChange={onChange} value={new Date(homePage.pickedDate)} />
    </>
  );
}

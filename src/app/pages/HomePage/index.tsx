import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { Feed } from '../../components/Feed';
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
      <Content>
        <Feed />
        <Calendar onChange={onChange} value={new Date(homePage.pickedDate)} />
      </Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80vw;
  min-height: 100vh;
`;

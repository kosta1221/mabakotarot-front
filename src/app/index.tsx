/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, HashRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { HeadlinesPage } from './pages/HeadlinesPage/Loadable';
import { ComparePage } from './pages/ComparePage/Loadable';
import { Drawer } from './components/Drawer';
import { Appbar } from './components/Appbar';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';

export function App() {
  return (
    <HashRouter>
      <Helmet
        titleTemplate="מה בכותרות! - הפלטפורמה המובילה להשוואה בין כותרות אתרי החדשות"
        defaultTitle="!מה בכותרות - הפלטפורמה המובילה להשוואה בין כותרות אתרי החדשות הישראליים"
        htmlAttributes={{ lang: 'he' }}
      >
        <meta
          name="description"
          content="!מה בכותרות - הפלטפורמה המובילה להשוואה בין כותרות אתרי החדשות הישראליים"
        />
      </Helmet>

      <Drawer />
      <Appbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/headlines" component={HeadlinesPage} />
        <Route exact path="/headlines/:site" component={HeadlinesPage} />
        <Route exact path="/compare" component={ComparePage} />
        <Route exact path="/compare/:id" component={ComparePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </HashRouter>
  );
}

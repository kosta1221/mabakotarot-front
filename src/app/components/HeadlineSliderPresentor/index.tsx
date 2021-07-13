/**
 *
 * HeadlineSliderPresentor
 *
 */
import * as React from 'react';

import 'react-awesome-lightbox/build/style.css';
import Lightbox from 'react-awesome-lightbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import styled from 'styled-components/macro';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { withStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import { currentLocalTime, yesterday } from 'utils/times';
import theme from 'styles/theme';

import { sites as allSites } from 'utils/sites';
import { sitesHebrew } from '../../../utils/sites';
import { useSelector, useDispatch } from 'react-redux';
import { selectSliders } from './slice/selectors';
import { slidersActions, initialSliderState } from './slice';
import { homepageActions } from 'app/pages/HomePage/slice';
import { appbarActions } from 'app/components/Appbar/slice';
import { selectAppbar } from 'app/components/Appbar/slice/selectors';
import { numFormatter, getNumFromHHMM } from 'utils/helpers';
import { turnDateStringIntoPresentableFormat } from 'utils/luxon';

interface Props {
  index: number;
  headlines?: Array<any>;
  lastItem?: any;
  isLoading?: boolean;
  isSortAsc?: boolean;
  sites?: string[] | null;
  handleToggleSortingorder?: any;
  startDate?: string;
  endDate?: string;
}

export function HeadlineSliderPresentor(props: Props) {
  const { index, headlines, sites, startDate } = props;

  const sliderDatePresentable =
    startDate?.split(' ')[0] === currentLocalTime.split(' ')[0]
      ? 'היום'
      : [
          startDate?.split(' ')[0] === yesterday.split(' ')[0]
            ? 'אתמול'
            : turnDateStringIntoPresentableFormat(startDate || '', true)
                .split(' ')[0]
                .concat(
                  ` ${
                    turnDateStringIntoPresentableFormat(
                      startDate || '',
                      true,
                    ).split(' ')[1]
                  }`,
                )
                .concat(
                  ` ${
                    turnDateStringIntoPresentableFormat(
                      startDate || '',
                      true,
                    ).split(' ')[2]
                  }`,
                ),
        ];

  const dispatch = useDispatch();
  const { sliders } = useSelector(selectSliders);
  const {
    indexOfImageToShow,
    isImageGalleryOpen,
    indexOfLightBoxToShow,
  } = useSelector(selectAppbar);

  const currentHeadline = headlines?.filter(
    headline => headline.date.split(' ')[1] === sliders[index]?.showedHeadline,
  )[0];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  if (index > sliders.length - 1) {
    dispatch(slidersActions.setSliders([...sliders, initialSliderState]));
  }

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

      const value = getNumFromHHMM(hhmm);

      return {
        value,
        label: null, // hhmm
      };
    });

  const images = headlines?.map(headline => ({
    url: headline.imageUrl || '',
    title:
      `${turnDateStringIntoPresentableFormat(headline.date, true)}: ${
        headline.titleText
      }` || '',
  }));

  const handleSitesMenuClicks = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleDateMenuClicks = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseSitesMenu = site => {
    setAnchorEl(null);
    if (site && typeof site === 'string') {
      dispatch(homepageActions.setSliderByIndex({ index, site }));
    }
  };

  const handleCloseDateMenu = () => {
    setAnchorEl2(null);
  };

  const handleImageClick = (indexOfImage: number | undefined) => {
    indexOfImage && dispatch(appbarActions.setIndexOfImageToShow(indexOfImage));
    dispatch(appbarActions.setIndexOfLightBoxToShow(index));
    dispatch(appbarActions.setIsImageGalleryOpen(true));
  };

  const handleSliderDateChange = (value, event) => {
    setAnchorEl2(null);
    const pickedStartDateFormatted = new DateTime.fromJSDate(value).toFormat(
      'yyyy-MM-dd HH:mm',
    );
    const pickedEndDateFormatted = new DateTime.fromJSDate(value)
      .set({ hour: 23, minute: 59 })
      .toFormat('yyyy-MM-dd HH:mm');
    dispatch(
      homepageActions.setSliderStartDateByIndex({
        index,
        startDate: pickedStartDateFormatted,
      }),
    );
    dispatch(
      homepageActions.setSlidersEndDateByIndex({
        index,
        endDate: pickedEndDateFormatted,
      }),
    );
  };

  return (
    <Div>
      {isImageGalleryOpen && indexOfLightBoxToShow === index && (
        <LightboxContainer>
          <Lightbox
            buttonAlign="flex-start"
            images={images?.reverse()}
            startIndex={
              headlines && indexOfImageToShow < headlines?.length
                ? indexOfImageToShow
                : 0
            }
            onClose={() => dispatch(appbarActions.setIsImageGalleryOpen(false))}
          />
          <ArticleLinkInLightbox
            href={
              headlines && indexOfImageToShow < headlines?.length
                ? headlines[headlines.length - 1 - indexOfImageToShow]
                    ?.titleArticleLink
                : 'test'
            }
            target="_blank"
          >
            קישור לכתבה
          </ArticleLinkInLightbox>
        </LightboxContainer>
      )}
      <StyledTypography
        variant="h6"
        id="time-slider"
        onClick={handleDateMenuClicks}
        gutterBottom
      >
        {`${sliderDatePresentable} ב-`}
        <StyledSitePickerButton
          style={{ textTransform: 'none' }}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleSitesMenuClicks}
        >
          {`${sliders[index] && sitesHebrew[sliders[index].pickedSite]}:`}
        </StyledSitePickerButton>
      </StyledTypography>

      <StyledMenu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleCloseSitesMenu}
        TransitionComponent={Fade}
      >
        {allSites.map(site => (
          <MenuItem key={site} onClick={e => handleCloseSitesMenu(site)}>
            {sitesHebrew[site]}
          </MenuItem>
        ))}
      </StyledMenu>

      {index && index === 1 ? (
        <Slider1StyledCalendarMenu
          id="calendar-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={open2}
          onClose={handleCloseDateMenu}
          TransitionComponent={Fade}
        >
          <Calendar
            onChange={handleSliderDateChange}
            value={startDate && new Date(startDate)}
            maxDate={new Date()}
            minDate={new Date('2021-06-19')}
          />
        </Slider1StyledCalendarMenu>
      ) : (
        <Slider2StyledCalendarMenu
          id="calendar-menu2"
          anchorEl={anchorEl2}
          keepMounted
          open={open2}
          onClose={handleCloseDateMenu}
          TransitionComponent={Fade}
        >
          <Calendar
            onChange={handleSliderDateChange}
            value={startDate && new Date(startDate)}
            maxDate={new Date()}
            minDate={new Date('2021-06-19')}
          />
        </Slider2StyledCalendarMenu>
      )}

      <StyledCard elevation={6}>
        <Image
          onClick={e =>
            handleImageClick(
              headlines && [...headlines].reverse().indexOf(currentHeadline),
            )
          }
          src={currentHeadline?.imageUrl}
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
    </Div>
  );
}

const Div = styled.div`
  margin-top: 5vh;
  & .lb-container {
    direction: ltr;
  }

  & .lb-title {
    direction: rtl;
  }
`;

const Image = styled.img`
  height: auto;
  width: 100%;
  align-self: center;
  cursor: zoom-in;
`;

const StyledCard = styled(Card)`
  margin-top: 2vh;
  border: 1.5px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .MuiSlider-markActive {
    background-color: white;
    opacity: 0.9;
  }
`;

const StyledSlider = withStyles({
  root: {
    color: '#1a237e',
    padding: '30px 0 10px 0',
    width: '95%',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },

  mark: {
    width: '3px',
    height: '8px',
    background: theme.palette.secondary.main,
  },
  markActive: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const ArticleLinkInLightbox = styled.a`
  z-index: 100000;
  border: 1px solid white;
  position: fixed;
  top: 10%;
  right: 45vw;
  font-size: 1.3rem;
  color: white;
  background: black;
  padding: 2px;
  min-width: 8vw;
  text-align: center;
`;

const LightboxContainer = styled.div``;

const StyledSitePickerButton = styled(Button)`
   display: inline-block;
   padding: 0.3em 1.2em;
   margin: 0 0.3em 0.3em 0;
   border-radius: 2em;
   box-sizing: border-box;
   text-decoration: none;
  font-size: 0.85rem;
   font-weight: 300;
   color: #ffffff;
   background-color: #1a237e;
   text-align: center;
   transition: all 0.2s;

  &:hover {
     background-color: #4095c6;
  }
`;

const StyledTypography = styled(Typography)`
  max-width: 15vw;
  @media (max-width: 1140px) {
    max-width: 40vw;
  }
  @media (max-width: 700px) {
    max-width: 60vw;
  }
`;

const StyledMenu = styled(Menu)`
  position: relative;
  margin-top: 6vh;
  margin-left: 1.5vw;
`;

const Slider1StyledCalendarMenu = styled(Menu)`
  & > .MuiPaper-root {
    top: 205px !important;
    left: 13% !important;
  }
`;

const Slider2StyledCalendarMenu = styled(Menu)`
  & > .MuiPaper-root {
    top: 205px !important;
    left: 60% !important;
  }
`;

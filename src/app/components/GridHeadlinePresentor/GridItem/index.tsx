/**
 *
 * GridItem
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Divider from '@material-ui/core/Divider';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { DateTime } from 'luxon';
import { sitesHebrew } from 'utils/sites';

import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { gridHeadlinePresentorActions as actions } from '../slice';

interface Props {
  lastItem?: any;
  headline?: any;
  index?: number;
  handleImageClick?: any;
}

const CompareTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'black',
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export function GridItem(props: Props) {
  const { headline, lastItem, index, handleImageClick } = props;

  const headlineDateTime = new DateTime.fromFormat(
    headline.date,
    'yyyy-MM-dd HH:mm',
  ).setLocale('he');
  const headlineDateTimePresentable = headlineDateTime.toFormat(
    'dd בMMM yyyy HH:mm',
  );

  const dispatch = useDispatch();

  const handleClickOpenDialog = pickedHeadlineId => {
    dispatch(actions.setSelectedHeadline(pickedHeadlineId));
    dispatch(actions.setIsDialogOpen(true));
  };

  return (
    <StyledCard
      elevation={6}
      ref={headline?.length === index || 0 + 1 ? lastItem : null}
      key={headline?._id}
    >
      <GridOptions>
        <GridDate>{`${headlineDateTimePresentable} ${
          sitesHebrew[headline.site]
        }`}</GridDate>
        <Divider orientation="vertical" flexItem />
        <AddToCompareButton onClick={() => handleClickOpenDialog(headline._id)}>
          <CompareTooltip title="הוספה להשוואת כותרות">
            <AddCircleOutlineRoundedIcon fontSize="large" />
          </CompareTooltip>
        </AddToCompareButton>
      </GridOptions>
      <Image
        onClick={e => handleImageClick(index)}
        src={headline.imageUrl}
        alt={`headline-${index}`}
      />
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  border: 1.5px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.8vw;
  background: lightgrey;
`;

const GridOptions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const AddToCompareButton = styled.div``;

const GridDate = styled.h3``;

const Image = styled.img`
  height: auto;
  width: 100%;
  align-self: center;
  cursor: zoom-in;
`;

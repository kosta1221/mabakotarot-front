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

import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { gridHeadlinePresentorActions as actions } from '../slice';

interface Props {
  lastItem?: any;
  headline?: any;
  index?: number;
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
  const { headline, lastItem, index } = props;

  const dispatch = useDispatch();

  const handleClickOpenDialog = pickedHeadlineId => {
    dispatch(actions.setSelectedHeadline(pickedHeadlineId));
    dispatch(actions.setIsDialogOpen(true));
  };

  return (
    <ItemContainer
      ref={headline?.length === index || 0 + 1 ? lastItem : null}
      key={headline?._id}
    >
      <GridOptions>
        <GridDate>{`${headline.date} ${headline._id.slice(20)}`}</GridDate>
        <Divider orientation="vertical" flexItem />
        <AddToCompareButton onClick={() => handleClickOpenDialog(headline._id)}>
          <CompareTooltip title="הוספה להשוואת כותרות">
            <AddCircleOutlineRoundedIcon fontSize="large" />
          </CompareTooltip>
        </AddToCompareButton>
      </GridOptions>
      <Image src={headline.imageUrl} alt={`headline-${index}`} />
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: lightgrey;
  border: 1.5px solid black;
  margin: 0.5vw;
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
`;

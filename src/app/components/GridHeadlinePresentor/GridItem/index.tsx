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
import { AddToCompareDialog } from './AddToCompareDialog/Loadable';

import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { gridHeadlinePresentorActions as actions } from '../slice';
import { drawerActions } from '../../Drawer/slice';
import { selectDrawer } from '../../Drawer/slice/selectors';

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

  const { comparisons } = useSelector(selectDrawer);

  const handleClickOpenDialog = () => {
    dispatch(actions.setIsDialogOpen(true));
  };

  const handleCloseDialog = (value: number) => {
    console.log(value);
    // if user pressed on new comparison button
    if (value === 99) {
      console.log(comparisons.length);
      const newCompare = {
        id: comparisons.length + 1,
        text: `השוואה חדשה - ${comparisons.length + 1}`,
        headlines: [],
      };

      const newComparisons = [...comparisons, newCompare];
      return dispatch(drawerActions.setComparisons(newComparisons));
    }

    dispatch(actions.setIsDialogOpen(false));
    const id = value;
    console.log(headline);

    const editedComparison = comparisons.find(element => element.id === id);
    const comparisonWithNewHeadline = {
      id: editedComparison?.id,
      text: editedComparison?.text,
      headlines: [...editedComparison?.headlines, headline],
    };

    const newComparisons = [
      ...comparisons.filter(comparison => comparison.id !== id),
      comparisonWithNewHeadline,
    ];

    dispatch(drawerActions.setComparisons(newComparisons));
    console.log(comparisons);
  };

  return (
    <ItemContainer
      ref={headline?.length === index || 0 + 1 ? lastItem : null}
      key={headline?._id}
    >
      <GridOptions>
        <GridDate>{`${headline.date} ${headline._id.slice(20)}`}</GridDate>
        <Divider orientation="vertical" flexItem />
        <AddToCompareButton onClick={handleClickOpenDialog}>
          <CompareTooltip title="הוספה להשוואת כותרות">
            <AddCircleOutlineRoundedIcon fontSize="large" />
          </CompareTooltip>
        </AddToCompareButton>
        <AddToCompareDialog onClose={value => handleCloseDialog(value)} />
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

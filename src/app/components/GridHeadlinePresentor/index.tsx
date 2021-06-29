/**
 *
 * GridHeadlinePresentor
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

import Loader from 'react-loader-spinner';

interface Props {
  headlines?: Array<any>;
  lastItem?: any;
  isLoading?: boolean;
  isSortAsc?: boolean;
  handleToggleSortingorder?: any;
}

export function GridHeadlinePresentor(props: Props) {
  const {
    headlines,
    lastItem,
    isLoading,
    isSortAsc,
    handleToggleSortingorder,
  } = props;

  return (
    <>
      <span onClick={handleToggleSortingorder}>{`Headlines sorted by: ${
        isSortAsc ? 'ascending' : 'descending'
      } order`}</span>

      <Grid>
        {headlines?.map((headline, i) => {
          return (
            <GridItem
              ref={headlines.length === i + 1 ? lastItem : null}
              key={headline._id}
            >
              <p>{`${headline.date} ${headline._id.slice(20)}`}</p>
              <Image src={headline.imageUrl} alt={`headline-${i}`} />
            </GridItem>
          );
        })}
      </Grid>

      {isLoading ? (
        <CenteredLoader type="Oval" color="#00BFFF" height={80} width={80} />
      ) : null}
    </>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vw;
  overflow-y: scroll;
`;
const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgrey;
  border: 1.5px solid black;
  margin: 0.5vw;
`;

const Image = styled.img`
  height: auto;
  width: 40vw;
  align-self: center;
`;

const CenteredLoader = styled(Loader)`
  display: flex;
  justify-content: center;
`;

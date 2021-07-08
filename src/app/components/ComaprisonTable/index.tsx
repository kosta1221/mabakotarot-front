/**
 *
 * ComaprisonTable
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';

interface Props {
  comparisonData: any;
}

const useStyles = makeStyles({
  table: {
    marginTop: '5vh',
  },
  cell: {
    fontSize: '1rem',
    minWidth: '10vw',
  },
  hCell: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    minWidth: '10vw',
  },
});

function createData(
  dataTitle: string,
  headline1: any,
  headline2?: any,
  headline3?: any,
) {
  if (headline3) {
    return { dataTitle, headline1, headline2, headline3 };
  } else if (headline2) {
    return { dataTitle, headline1, headline2 };
  }
  return { dataTitle, headline1 };
}

export function ComaprisonTable(props: Props) {
  const { comparisonData } = props;
  const { headlines } = comparisonData;
  const classes = useStyles();

  const rows = [
    // createData(
    //   'סמן כותרת',
    //   <Checkbox
    //     checked={headlineOneChecked}
    //     onChange={handleChange}
    //     inputProps={{ 'aria-label': 'primary checkbox' }}
    //   />,
    //   <Checkbox
    //     checked={headlineTwoChecked}
    //     onChange={handleChange}
    //     inputProps={{ 'aria-label': 'primary checkbox' }}
    //   />,
    //   <Checkbox
    //     checked={headlineThreeChecked}
    //     onChange={handleChange}
    //     inputProps={{ 'aria-label': 'primary checkbox' }}
    //   />,
    // ),
    createData(
      'אתר',
      headlines[0].site,
      headlines[1]?.site,
      headlines[2]?.site,
    ),
    createData(
      'תמונה',
      <Image src={headlines[0].imageUrl} />,
      <Image src={headlines[1].imageUrl} />,
      <Image src={headlines[2].imageUrl} />,
    ),
    createData(
      'תאריך',
      headlines[0].date,
      headlines[1]?.date,
      headlines[2]?.date,
    ),
    createData(
      'כותרת ראשית',
      headlines[0].titleText,
      headlines[1]?.titleText,
      headlines[2]?.titleText,
    ),
    createData(
      'כותרת משנה',
      headlines[0].subtitleText,
      headlines[1]?.subtitleText,
      headlines[2]?.subtitleText,
    ),
    createData(
      'קישור למאמר הראשי',
      <ArticleLink href={headlines[0].titleArticleLink} target="_blank">
        קישור לכתבה
      </ArticleLink>,
      <ArticleLink href={headlines[1].titleArticleLink} target="_blank">
        קישור לכתבה
      </ArticleLink>,
      <ArticleLink href={headlines[2].titleArticleLink} target="_blank">
        קישור לכתבה
      </ArticleLink>,
    ),
  ];

  console.log(rows);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.dataTitle}>
              <TableCell className={classes.hCell} align="center">
                {row.dataTitle}
              </TableCell>
              <TableCell className={classes.cell} align="center">
                {row.headline1}
              </TableCell>
              {row?.headline2 && (
                <TableCell className={classes.cell} align="center">
                  {row.headline2}
                </TableCell>
              )}
              {row?.headline3 && (
                <TableCell className={classes.cell} align="center">
                  {row.headline3}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Image = styled.img`
  max-width: 25vw;
`;

const ArticleLink = styled.a``;

// const CloseButton = styled.div`
//   align-self: flex-start;
//   margin: 5px;

//   &:hover {
//     cursor: pointer;
//   }
// `;

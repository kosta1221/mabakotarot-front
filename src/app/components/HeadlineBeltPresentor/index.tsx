/**
 *
 * HeadlineBeltPresentor
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { sitesHebrew } from 'utils/sites';

import { TextScroller } from './TextScroller';

interface Props {
  headlines?: Array<any>;
  sites?: string[] | null;
}

export function HeadlineBeltPresentor(props: Props) {
  const {
    headlines,
    // isLoading,
  } = props;

  return (
    <Div>
      <TextScroller
        text={headlines?.map((headline, i) => {
          const text = ` ${sitesHebrew[headline.site]}: ${headline.titleText} `;

          if (i === 0) {
            return text.padEnd(text.length + 30, String.fromCharCode(160));
          }

          if (i === headlines.length - 1) {
            return text.padStart(text.length + 30, String.fromCharCode(160));
          }

          return text
            .padStart(text.length + 20, String.fromCharCode(160))
            .padEnd(text.length + 40, String.fromCharCode(160));
        })}
      />
    </Div>
  );
}

const Div = styled.div`
  text-align: center;
  font-size: 1.4rem;
  overflow-x: hidden;
  & > div {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

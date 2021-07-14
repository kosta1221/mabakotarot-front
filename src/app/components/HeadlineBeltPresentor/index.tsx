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
  const { headlines } = props;

  return (
    <BeltContainer>
      <TextScroller
        text={headlines?.map((headline, i) => {
          const text = ` ${sitesHebrew[headline.site]} ב${
            headline.date.split(' ')[1]
          }: ${headline.titleText} `;

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
    </BeltContainer>
  );
}

const BeltContainer = styled.div`
  margin-top: 1vh;
  text-align: center;
  font-size: 1.4rem;
  overflow-x: hidden;
  background: white;
  border-top: 0.5px black solid;
  border-bottom: 0.5px black solid;

  & > div {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

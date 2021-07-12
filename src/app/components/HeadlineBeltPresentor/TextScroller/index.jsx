/**
 *
 * TextScroller
 *
 */
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components/macro';

export function TextScroller(props) {
  const { text } = props;

  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: 'translate(350%,0)' },
    to: { transform: 'translate(-350%,0)' },
    config: { duration: 90000 },
    reset: true,
    onRest: () => {
      setKey(key + 1);
    },
  });

  return (
    <Div key={key}>
      <animated.div style={scrolling}>{text}</animated.div>
    </Div>
  );
}

const Div = styled.div``;

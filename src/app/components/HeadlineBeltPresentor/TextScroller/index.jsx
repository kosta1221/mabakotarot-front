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
  console.log(text.toString().length);

  const scrolling = useSpring({
    from: { transform: 'translate(-100%,0)' },
    to: {
      transform: `translate(${Math.floor(text.toString().length / 1.9)}%,0)`,
    },
    config: { duration: 60000 },
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

import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Circle, Defs, Rect, Mask } from 'react-native-svg';

const Mascara = () => {
  const { height, width } = Dimensions.get('window');
  const circleRadius = width / 2.2;
  return (
    <Svg height={height} width={width}>
      <Defs>
        <Mask id="mask" x={0} y={0} height={height} width={width}>
          <Rect height={height} width={width} fill="white" />
          <Circle r={circleRadius} cx={width * 0.5} cy={height * 0.4} fill="black" />
        </Mask>
      </Defs>
      <Rect height={height} width={width} fill="white" mask="url(#mask)" fill-opacity={0} />
    </Svg>
  );
};

export default Mascara;

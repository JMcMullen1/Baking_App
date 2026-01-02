import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props {
  size?: number;
}

// Bailey - King Charles Cavalier with blue baking hat and whisk
export const BaileyMascot: React.FC<Props> = ({ size = 100 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      {/* Body */}
      <Ellipse cx="100" cy="130" rx="40" ry="50" fill="#8B4513" />

      {/* Head */}
      <Circle cx="100" cy="80" r="35" fill="#8B4513" />

      {/* Ears - long and floppy */}
      <Ellipse cx="70" cy="75" rx="15" ry="35" fill="#654321" />
      <Ellipse cx="130" cy="75" rx="15" ry="35" fill="#654321" />

      {/* Face markings - white chest */}
      <Path d="M 85 95 Q 100 105 115 95" fill="white" />

      {/* Eyes */}
      <Circle cx="90" cy="75" r="5" fill="black" />
      <Circle cx="110" cy="75" r="5" fill="black" />
      <Circle cx="91" cy="74" r="2" fill="white" />
      <Circle cx="111" cy="74" r="2" fill="white" />

      {/* Nose */}
      <Ellipse cx="100" cy="85" rx="6" ry="4" fill="black" />

      {/* Smile */}
      <Path d="M 100 85 Q 95 90 90 88" stroke="black" strokeWidth="2" fill="none" />
      <Path d="M 100 85 Q 105 90 110 88" stroke="black" strokeWidth="2" fill="none" />

      {/* Blue baking hat */}
      <Ellipse cx="100" cy="50" rx="38" ry="12" fill="#B4D4FF" />
      <Rect x="70" y="35" width="60" height="15" rx="5" fill="#B4D4FF" />
      <Ellipse cx="100" cy="35" rx="30" ry="10" fill="#D4E5FF" />

      {/* Whisk in paw */}
      <Path d="M 60 140 L 58 170" stroke="#8B7355" strokeWidth="3" fill="none" />
      <Path d="M 52 170 L 58 185" stroke="#C0C0C0" strokeWidth="2" fill="none" />
      <Path d="M 56 170 L 58 185" stroke="#C0C0C0" strokeWidth="2" fill="none" />
      <Path d="M 60 170 L 58 185" stroke="#C0C0C0" strokeWidth="2" fill="none" />
      <Path d="M 64 170 L 58 185" stroke="#C0C0C0" strokeWidth="2" fill="none" />

      {/* Paws */}
      <Ellipse cx="75" cy="140" rx="10" ry="15" fill="#654321" />
      <Ellipse cx="125" cy="140" rx="10" ry="15" fill="#654321" />
    </Svg>
  );
};

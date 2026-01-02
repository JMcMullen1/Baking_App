import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props {
  size?: number;
}

// Nellie - Golden Retriever with pink baking hat and wooden spoon
export const NellieMascot: React.FC<Props> = ({ size = 100 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      {/* Body */}
      <Ellipse cx="100" cy="135" rx="45" ry="55" fill="#DAA520" />

      {/* Head */}
      <Circle cx="100" cy="85" r="38" fill="#DAA520" />

      {/* Ears - floppy */}
      <Ellipse cx="68" cy="80" rx="18" ry="30" fill="#B8860B" />
      <Ellipse cx="132" cy="80" rx="18" ry="30" fill="#B8860B" />

      {/* Snout */}
      <Ellipse cx="100" cy="95" rx="20" ry="15" fill="#DEB887" />

      {/* Eyes */}
      <Circle cx="88" cy="78" r="6" fill="black" />
      <Circle cx="112" cy="78" r="6" fill="black" />
      <Circle cx="89" cy="77" r="2.5" fill="white" />
      <Circle cx="113" cy="77" r="2.5" fill="white" />

      {/* Nose */}
      <Ellipse cx="100" cy="92" rx="7" ry="5" fill="black" />

      {/* Smile */}
      <Path d="M 100 92 Q 92 98 85 96" stroke="black" strokeWidth="2" fill="none" />
      <Path d="M 100 92 Q 108 98 115 96" stroke="black" strokeWidth="2" fill="none" />

      {/* Pink baking hat */}
      <Ellipse cx="100" cy="52" rx="40" ry="13" fill="#FFB4D6" />
      <Rect x="68" y="37" width="64" height="15" rx="5" fill="#FFB4D6" />
      <Ellipse cx="100" cy="37" rx="32" ry="10" fill="#FFD4E6" />

      {/* Wooden spoon in paw */}
      <Ellipse cx="145" cy="145" rx="12" ry="8" fill="#8B4513" />
      <Rect x="142" y="115" width="6" height="35" rx="3" fill="#8B4513" />

      {/* Paws */}
      <Ellipse cx="80" cy="180" rx="12" ry="18" fill="#B8860B" />
      <Ellipse cx="120" cy="180" rx="12" ry="18" fill="#B8860B" />

      {/* Fluffy chest */}
      <Ellipse cx="100" cy="110" rx="25" ry="15" fill="#F4E4C1" opacity="0.7" />
    </Svg>
  );
};

import React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface SpacerProps {
  value: number;
  onChange: (value: number) => void;
}

const ReactSlider: React.FC<SpacerProps> = ({ value, onChange }) => {
  return (
    <StyledSlider>
      <Slider
        onChange={onChange}
        tabIndex={10}
        step={1}
        value={value}
        ariaLabelForHandle="1"
        ariaLabelledByForHandle="2"
        trackStyle={trackStyle}
        railStyle={railStyle}
        handleStyle={handleStyle}
        dotStyle={dotStyle}
        activeDotStyle={activeDotStyle}
        marks={{
          0: <StyledLabel active={value >= 0}>0%</StyledLabel>,
          25: <StyledLabel active={value >= 25}>25%</StyledLabel>,
          50: <StyledLabel active={value >= 50}>50%</StyledLabel>,
          75: <StyledLabel active={value >= 75}>75%</StyledLabel>,
          100: <StyledLabel active={value >= 100}>100%</StyledLabel>,
        }}
      />
    </StyledSlider>
  );
};

const trackStyle = { backgroundColor: '#03a062', height: '4px' };
const railStyle = { backgroundColor: '#333e55', height: '3px' };
const handleStyle = { backgroundColor: '#0a0a0a', border: '2px solid #03a062' };
const dotStyle = { backgroundColor: '#333e55', border: '1px solid #1d2636' };
const activeDotStyle = { backgroundColor: 'transparent', border: 'none' };

const StyledSlider = styled.div`
  margin-top: 15px;
  height: 40px;
  .rc-slider-handle {
    width: 12px;
    height: 12px;
    margin-top: -4px;
  }
`;

const StyledLabel = styled.div<{ active?: boolean }>`
  font-size: 14px;
  font-weight: normal;
  color: ${({ active }) => (active ? '#ffffff' : '#cecece')};
  :hover {
    color: #ffffff;
  }
`;

export default ReactSlider;

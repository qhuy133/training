import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

type TooltipProps = {
  content: string;
};

const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  return (
    <>
      <Placeholder data-tip={content} data-class="custom-tooltip">
        <i className="far fa-info-circle"></i>
      </Placeholder>
      <ReactTooltip
        effect="solid"
        type="info"
        multiline={true}
        backgroundColor="#e5e7ef"
        textColor="#070a10"
      />
    </>
  );
};

const Placeholder = styled.p`
  margin-left: 5px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 12px;
  display: block;
  i {
    color: #3085b1;
    display: block;
    margin-top: 1px;
  }
`;

export default Tooltip;

import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import ImgBanner1 from '../../assets/images/info-banner-bg1.png';
import ImgBanner2 from '../../assets/images/info-banner-bg2.png';
import { BreakPoints } from '../../utils/styles';

type InfoBannerProps = {
  type: 'short' | 'long' | 'gov';
  title?: string;
  content?: string;
};

const InfoBanner: React.FC<InfoBannerProps> = ({ type, title, content, children }) => {
  const bgImage = useMemo(() => {
    switch (type) {
      case 'short':
        return ImgBanner1;
      case 'gov':
        return ImgBanner2;
      case 'long':
      default:
        return ImgBanner2;
    }
  }, [type]);

  return (
    <StyledBannerContainer bg={bgImage} type={type}>
      <div className="title">{title}</div>
      <div className="content">{content || children}</div>
    </StyledBannerContainer>
  );
};

const StyledBannerContainer = styled.div<{ bg: string; type: string }>`
  margin-bottom: 20px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: top right;
  padding: 20px 25px;
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  .title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .content {
    font-size: 16px;
    color: #f2f2f2;
    white-space: pre-line;
  }
  @media screen and (min-width: ${BreakPoints.lg}) {
    padding-right: ${({ type }) => (type === 'gov' ? '200px' : '25px')};
  }
`;

export default InfoBanner;

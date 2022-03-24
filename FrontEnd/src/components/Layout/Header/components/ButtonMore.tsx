import React from 'react';
import styled from 'styled-components';
import { ExternalLinks } from '../../../../utils/constants';
import { screenUp } from '../../../../utils/styles';
import { Dropdown, DropdownMenu, DropdownToggle } from '../../../Dropdown';

const ButtonMore: React.FC = () => {
  return (
    <Dropdown>
      <DropdownToggle>
        <StyledButtonMore>
          More
          <i className="fas fa-sort-down"></i>
        </StyledButtonMore>
      </DropdownToggle>
      <StyledDropdownMenu position="left">
        <ul>
          <li>
            <a href={ExternalLinks.documentations} target="_blank">
              <i className="far fa-books"></i>
              Documentations
            </a>
          </li>
          <li>
            <a href={ExternalLinks.codes} target="_blank">
              <i className="fab fa-github"></i>
              Github
            </a>
          </li>
          <li>
            <a href={ExternalLinks.medium} target="_blank">
              <i className="fab fa-medium"></i>
              Medium
            </a>
          </li>
          <li>
            <a href={ExternalLinks.twitter} target="_blank">
              <i className="fab fa-twitter"></i>
              Twitter
            </a>
          </li>
          <li>
            <a href={ExternalLinks.telegram} target="_blank">
              <i className="fab fa-telegram"></i>
              Telegram
            </a>
          </li>
        </ul>
      </StyledDropdownMenu>
    </Dropdown>
  );
};

const StyledButtonMore = styled.li`
  display: flex;
  align-items: center;
  display: none;
  cursor: pointer;
  margin: 0 20px;
  color: ${(props) => props.theme.colors.secondary};
  i {
    padding-left: 4px;
  }
  &:hover {
    color: #fff;
  }
  ${screenUp('lg')`
    display: inline;
  `}
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  margin-top: 10px;
  width: 180px;
  min-width: auto;
  ::after {
    content: '';
    background: none;
  }
  ul {
    padding-left: 0;
    margin: 0;
    li {
      padding: 10px 0;
      margin: 0;
      font-size: 0.86rem;
      a {
        color: #070a10;
        display: flex;
        align-items: center;
        transition: all 0.2s ease-in-out 0s;
        i {
          width: 25px;
        }
        &:hover {
          color: #3085b1;
        }
      }
    }
  }
`;

export default ButtonMore;

import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import {
  useSetSlippageTolerance,
  useSetTransactionDeadline,
  useTrasactionSettings,
} from '../../state/application/hooks';
import { Dropdown, DropdownMenu, DropdownToggle } from '../Dropdown';

export const DropdownTransactionSettings: React.FC = () => {
  const settings = useTrasactionSettings();
  const setSlippage = useSetSlippageTolerance();
  const setTransactionDeadline = useSetTransactionDeadline();
  const inputSlippageValue = useMemo(() => {
    return settings.slippageTolerance * 100;
  }, [settings.slippageTolerance]);

  const setPresetSlippage = useCallback(
    (ev: React.MouseEvent<HTMLInputElement>) => {
      const value = ev.currentTarget.dataset.value;
      setSlippage(+value);
    },
    [setSlippage],
  );

  const inputSlippage = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const value = ev.target.value;
      setSlippage(+value / 100);
    },
    [setSlippage],
  );

  const inputTransactionDeadline = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const value = ev.target.value;
      setTransactionDeadline(+value);
    },
    [setTransactionDeadline],
  );

  return (
    <Dropdown>
      <DropdownToggle>
        <ButtonSettings>
          <i className="fal fa-cog" />
        </ButtonSettings>
      </DropdownToggle>
      <Form position="right" disableAutoClose>
        <Heading>Slippage control</Heading>
        <FormRow>
          <Button
            selected={settings.slippageTolerance === 0.001}
            onClick={setPresetSlippage}
            data-value="0.001"
          >
            0.1%
          </Button>
          <Button
            onClick={setPresetSlippage}
            data-value="0.005"
            selected={settings.slippageTolerance === 0.005}
          >
            0.5%
          </Button>
          <Button
            onClick={setPresetSlippage}
            data-value="0.01"
            selected={settings.slippageTolerance === 0.01}
          >
            1%
          </Button>
          <Input>
            <input type="number" onChange={inputSlippage} value={inputSlippageValue} />
            <div className="unit">%</div>
          </Input>
        </FormRow>
        <Heading>Transaction deadline</Heading>
        <FormRow>
          <Input>
            <input
              type="number"
              value={settings.transactionDeadline}
              onChange={inputTransactionDeadline}
            />
          </Input>
          <div className="unit">minutes</div>
        </FormRow>
      </Form>
    </Dropdown>
  );
};

const Form = styled(DropdownMenu)``;

const Heading = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

const ButtonSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(p) => p.theme.colors.secondary};
  font-size: 20px;
  height: 46px;
  width: 46px;
  border: solid 1px #313743;
  :hover {
    background-color: #171721;
    border-color: #313743;
  }
`;

const FormControlStyle = `
  position: relative;
  z-index: 1;
  border-radius: 6px;
  border: 1px solid #dcdfe966;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  width: 72px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Button = styled.button<{ selected: boolean }>`
  ${FormControlStyle}
  padding: 10px 15px;
  color: ${(p) => (p.selected ? '#cecece !important' : '#adafb4')};
  background-color: ${(p) => (p.selected ? '#cecece !important' : '#20202e')};
  border-radius: 5px;
  z-index: 1;
  &::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 5px;
    background-color: #20202e;
    z-index: -1;
  }
  :hover {
    color: #cecece !important;
  }
`;

const Input = styled.div`
  ${FormControlStyle};
  flex-shrink: 0;

  input {
    width: 82px;
    padding: 10px 30px 10px 10px;
    border: none;
    background: transparent;
    color: #adafb4;
    :focus {
      color: #cecece;
    }
  }
  .unit {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  &::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 5px;
    background-color: #20202e;
    z-index: -1;
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  .unit {
    font-size: 14px !important;
    font-weight: 400;
  }
`;

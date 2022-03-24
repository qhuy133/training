import React, { useState } from 'react';
import styled from 'styled-components';
import { useFarmingPools } from '../../state/farms/hooks';
import FarmItem from './components/FarmItemNew';
import { useEffect } from 'react';
import { useWatchTokenBalance } from '../../state/user/hooks';
import { useMemo } from 'react';
import { Collapse } from '../../components/Collapse';

const Farms: React.FC = () => {
  const pools = useFarmingPools();

  const corePools = useMemo(() => {
    return pools?.filter((p) => !p?.poolConfig?.farmUrl);
  }, [pools]);

  const activeFarms = useMemo(() => {
    return corePools?.filter((s) => !s.poolConfig.inactive);
  }, [corePools]);

  const watchToken = useWatchTokenBalance();

  useEffect(() => {
    if (!pools) {
      return;
    }
    const tokens = pools.map((t) => t.poolConfig.wantSymbol);
    watchToken(tokens);
  }, [watchToken, pools]);

  return (
    <StyledContainer>
      <StyledForm>
        <Collapse>
          {(activeFarms || []).map((p, index) => (
            <FarmItem key={index} index={index} pool={p} />
          ))}
        </Collapse>
      </StyledForm>
    </StyledContainer>
  );
};

export default Farms;


const StyledContainer = styled.div`
  margin-bottom: 25px;
`;

const StyledForm = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0px;
  border-radius: 20px;
`;


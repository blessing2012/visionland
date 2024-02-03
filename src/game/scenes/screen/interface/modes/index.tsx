import React from 'react';

import { mapEntries } from '~lib/utils';
import { WorldMode } from '~scene/world/types';

import { Item } from './item';
import { Wrapper } from './styles';

export const Modes: React.FC = () => (
  <Wrapper>
    {mapEntries(WorldMode, (key, mode) => (
      <Item key={key} mode={mode} />
    ))}
  </Wrapper>
);

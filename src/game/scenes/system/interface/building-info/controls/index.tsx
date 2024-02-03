import React from 'react';

import { BuildingControl } from '~scene/world/entities/building/types';

import { Action } from './action';
import { Wrapper } from './styles';

type Props = {
  list: BuildingControl[]
};

export const Controls: React.FC<Props> = ({ list }) => (
  <Wrapper>
    {list.map((control) => (
      <Action key={control.label} control={control} />
    ))}
  </Wrapper>
);

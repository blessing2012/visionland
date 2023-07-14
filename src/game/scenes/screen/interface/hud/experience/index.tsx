import { useScene, useSceneUpdate } from 'phaser-react-ui';
import React, { useState } from 'react';

import { GameScene } from '~type/game';
import { IWorld } from '~type/world';

import { ComponentWidget } from '../widget';

export const ComponentExperience: React.FC = () => {
  const world = useScene<IWorld>(GameScene.WORLD);

  const [amount, setAmount] = useState(0);

  useSceneUpdate(world, () => {
    setAmount(world.player.experience);
  });

  return <ComponentWidget icon="experience">{amount}</ComponentWidget>;
};

ComponentExperience.displayName = 'ComponentExperience';

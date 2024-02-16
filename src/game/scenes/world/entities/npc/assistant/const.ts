import { ShotBallFire } from '../../shot/ball/variants/fire';
import { ShotBallSimple } from '../../shot/ball/variants/simple';
import { ShotLazer } from '../../shot/lazer';
import { AssistantVariant } from './types';
import type { IShotFactory } from '../../shot/types';

export const ASSISTANT_TILE_SIZE = {
  width: 12,
  height: 24,
  gamut: 4,
};

export const ASSISTANT_PATH_BREAKPOINT = 40;

export const ASSISTANT_WEAPON: Record<AssistantVariant, IShotFactory> = {
  [AssistantVariant.DEFAULT]: ShotBallSimple,
  [AssistantVariant.FIREBOT]: ShotBallFire,
  [AssistantVariant.LASERBOT]: ShotLazer,
};

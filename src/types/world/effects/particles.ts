import Phaser from 'phaser';

import { IWorld } from '~type/world';

import { Vector2D } from '../level';

export interface IParticles {
  readonly scene: IWorld

  /**
   * Particles emitter.
   */
  readonly emitter: Phaser.GameObjects.Particles.ParticleEmitter

  /**
   * Destroy emitter.
   */
  destroy(): void
}

export interface IParticlesParent extends Phaser.GameObjects.GameObject {
  readonly scene: IWorld

  /**
   * Record of current effects.
   */
  effects?: Partial<Record<string, IParticles>>
}

export enum ParticlesTexture {
  BIT = 'effect/bit',
  GLOW = 'effect/glow',
}

export type ParticlesData = {
  key: string
  positionAtWorld?: Vector2D
  texture: ParticlesTexture
  params: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig
};
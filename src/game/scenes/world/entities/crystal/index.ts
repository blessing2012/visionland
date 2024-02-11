import Phaser from 'phaser';

import { DIFFICULTY } from '../../../../../const/difficulty';
import { Assets } from '~lib/assets';
import { progressionLinear } from '~lib/progression';
import { ShaderType } from '~lib/shader/types';
import { Level } from '~scene/world/level';
import type { ITile } from '~scene/world/level/tile-matrix/types';
import { TileType, PositionAtMatrix } from '~scene/world/level/types';
import type { IWorld } from '~scene/world/types';

import { CRYSTAL_TILE } from './const';
import {
  CrystalAudio, CrystalTexture, ICrystal, CrystalData, CrystalEvents, CrystalSavePayload,
} from './types';
import { EntityType } from '../types';

Assets.RegisterAudio(CrystalAudio);
Assets.RegisterSprites(CrystalTexture, CRYSTAL_TILE);

export class Crystal extends Phaser.GameObjects.Image implements ICrystal, ITile {
  readonly scene: IWorld;

  readonly tileType: TileType = TileType.CRYSTAL;

  readonly positionAtMatrix: PositionAtMatrix;

  constructor(scene: IWorld, {
    positionAtMatrix, variant = 0,
  }: CrystalData) {
    const positionAtWorld = Level.ToWorldPosition(positionAtMatrix);

    super(scene, positionAtWorld.x, positionAtWorld.y, CrystalTexture.CRYSTAL, variant);
    scene.add.existing(this);
    scene.addEntityToGroup(this, EntityType.CRYSTAL);

    this.positionAtMatrix = positionAtMatrix;

    if (this.scene.game.isDesktop()) {
      this.setInteractive({
        pixelPerfect: true,
      });

      this.handlePointer();
    }

    this.setDepth(positionAtWorld.y);
    this.setOrigin(0.5, CRYSTAL_TILE.origin);
    this.scene.level.putTile(this, { ...positionAtMatrix, z: 1 });
  }

  public pickup() {
    const resources = this.getResourcesAmount();

    this.scene.player.giveResources(resources);

    this.scene.getEntitiesGroup(EntityType.CRYSTAL)
      .emit(CrystalEvents.PICKUP, this, resources);

    this.scene.fx.playSound(CrystalAudio.PICKUP);

    this.destroy();
  }

  private getResourcesAmount() {
    const amount = progressionLinear({
      defaultValue: DIFFICULTY.CRYSTAL_RESOURCES,
      scale: DIFFICULTY.CRYSTAL_RESOURCES_GROWTH,
      level: this.scene.wave.number,
      maxLevel: DIFFICULTY.CRYSTAL_RESOURCES_GROWTH_MAX_LEVEL,
    });

    return Phaser.Math.Between(
      amount - Math.floor(amount * 0.25),
      amount + Math.floor(amount * 0.25),
    );
  }

  public getSavePayload(): CrystalSavePayload {
    return {
      position: this.positionAtMatrix,
    };
  }

  private handlePointer() {
    this.on(Phaser.Input.Events.POINTER_OVER, () => {
      if (this.scene.builder.isBuild) {
        return;
      }

      this.addShader(ShaderType.OUTLINE, {
        size: 2.0,
        color: 0xffffff,
      });
    });

    this.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.removeShader(ShaderType.OUTLINE);
    });
  }
}

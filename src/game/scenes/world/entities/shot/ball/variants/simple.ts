import { ShotParams, ShotData, ShotBallAudio } from '../../types';
import { IEnemy } from '~scene/world/entities/npc/enemy/types';
import { IWorld } from '~scene/world/types';

import { ShotBall } from '../ball';

export class ShotBallSimple extends ShotBall {
  constructor(scene: IWorld, params: ShotParams, data: ShotData = {}) {
    super(scene, params, {
      ...data,
      audio: ShotBallAudio.SIMPLE,
      color: 0xfff985,
    });
  }

  public hit(target: IEnemy) {
    super.hit(target);

    this.scene.fx.createBloodEffect(target);

    if (this.params.damage) {
      target.live.damage(this.params.damage);
    }
  }
}

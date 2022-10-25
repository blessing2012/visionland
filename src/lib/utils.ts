import Phaser from 'phaser';
import { MIN_VALID_SCREEN_SIZE } from '~const/core';

/**
 * Quadratic equation for calculating difficulty
 * relative to the specified level.
 *
 * @param startValue - Default value for first level
 * @param growthScale - Part of start value for growth
 * @param level - Difficulty level
 */
export function calcGrowth(
  startValue: number,
  growthScale: number,
  level: number,
): number {
  return Math.round(startValue + (((level - 1) ** 1.1) * (startValue * growthScale)));
}

/**
 * Check positions is equals.
 *
 * @param a - First position
 * @param b - Second position
 */
export function equalPositions(
  a: Phaser.Types.Math.Vector3Like,
  b: Phaser.Types.Math.Vector3Like,
): boolean {
  return (a.x === b.x && a.y === b.y && a.z === b.z);
}

/**
 * Format timestamp to string time.
 *
 * @param value - Timestamp in seconds
 */
export function formatTime(value: number): string {
  const h = Math.floor(value / 60);
  const m = value % 60;

  return `${(h < 10 ? '0' : '')}${h}:${(m < 10 ? '0' : '')}${m}`;
}

/**
 * Select closest positions to target.
 *
 * @param positions - Positions list
 * @param target - Target position
 * @param count - Count return positions
 */
export function selectClosest<T extends Phaser.Types.Math.Vector2Like>(
  positions: T[],
  target: Phaser.Types.Math.Vector2Like,
  count: number = 1,
): T[] {
  let meta = positions.map((position: T) => {
    const dx = position.x - target.x;
    const dy = position.y - target.y;

    return {
      position,
      distance: Math.sqrt(dx * dx + dy * dy),
    };
  });

  // Sort by distance to target
  meta = meta.sort((a, b) => (a.distance - b.distance))
    .slice(0, count);

  return meta.map(({ position }) => position);
}

/**
 * Get array of positions around source position.
 *
 * @param position - Source position
 */
export function aroundPosition(
  position: Phaser.Types.Math.Vector2Like,
): Phaser.Types.Math.Vector2Like[] {
  const { x, y } = position;
  const shift = 2;

  return [
    { x, y: y - shift },
    { x: x + shift, y: y - shift },
    { x: x + shift, y },
    { x: x + shift, y: y + shift },
    { x, y: y + shift },
    { x: x - shift, y: y + shift },
    { x: x - shift, y },
    { x: x - shift, y: y - shift },
  ];
}

/**
 * Call function with frequency limit.
 *
 * @param fn - Function
 * @param delay - Delay between calls
 */
export function throttle(fn: (...params: any[]) => void, delay: number) {
  let called = false;

  return function (this: any, ...args: any[]) {
    if (!called) {
      called = true;
      fn.apply(this, args);

      setTimeout(() => {
        fn.apply(this, args);
        called = false;
      }, delay);
    }
  };
}

/**
 * Check device screen size.
 */
export function isValidScreenSize() {
  return (
    window.innerWidth >= MIN_VALID_SCREEN_SIZE[0]
    && window.innerHeight >= MIN_VALID_SCREEN_SIZE[1]
  );
}

/**
 * Check device OS.
 */
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

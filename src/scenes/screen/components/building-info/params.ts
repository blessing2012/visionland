import { INTERFACE_FONT } from '~const/interface';
import { Component, scaleText, switchSize } from '~lib/interface';
import { ScreenTexture } from '~type/screen';
import { BuildingParamItem } from '~type/world/entities/building';

type Props = {
  params: () => BuildingParamItem[]
};

export const ComponentParams = Component<Props>(function (container, {
  params,
}) {
  const ref: Record<string, {
    wrapper?: Phaser.GameObjects.Container
    body?: Phaser.GameObjects.Rectangle
    iconBody?: Phaser.GameObjects.Rectangle
    icon?: Phaser.GameObjects.Image
    label?: Phaser.GameObjects.Text
    value?: Phaser.GameObjects.Text
  }> = {};

  const state: {
    values: Record<string, string | number>
  } = { values: {} };

  /**
   * Adaptation
   */

  container.useAdaptationBefore(() => {
    if (container.parentContainer) {
      // eslint-disable-next-line no-param-reassign
      container.width = container.parentContainer.width - switchSize(24);
    } else {
      // eslint-disable-next-line no-param-reassign
      container.width = switchSize(196);
    }
  });

  container.useAdaptationAfter(() => {
    /**
     * Set wrappers grid positions
     */

    const gridGap = switchSize(4);
    const gridColumns = 2;
    const gridOffset = [0, 0];

    Object.values(ref).forEach(({ wrapper, body, iconBody }) => {
      wrapper.setSize(
        (container.width - ((gridColumns - 1) * gridGap)) / gridColumns,
        iconBody.height + (iconBody.y * 2),
      );
      wrapper.setPosition(
        (wrapper.width + gridGap) * gridOffset[0],
        (wrapper.height + gridGap) * gridOffset[1],
      );

      body.setSize(
        wrapper.width,
        wrapper.height,
      );

      gridOffset[0]++;
      if (gridOffset[0] === gridColumns) {
        gridOffset[0] = 0;
        gridOffset[1]++;
      }
    });

    /**
     * Set container height by content
     */

    const refs = Object.values(ref);
    const lastWrapper = refs[refs.length - 1]?.wrapper;

    if (lastWrapper) {
      // eslint-disable-next-line no-param-reassign
      container.height = lastWrapper.y + lastWrapper.height;
    }
  });

  /**
   * Creating
   */

  for (const {
    label, value, color, icon,
  } of params()) {
    ref[label] = {};
    state.values[label] = value;

    /**
     * Wrapper
     */

    container.add(
      ref[label].wrapper = this.add.container(),
    );

    /**
     * Body
     */

    ref[label].wrapper.add(
      ref[label].body = this.add.rectangle(0, 0, 0, 0, 0x000000, 0.25),
    );

    ref[label].body.setName('Body');
    ref[label].body.setOrigin(0.0, 0.0);

    /**
     * Icon body
     */

    ref[label].wrapper.add(
      ref[label].iconBody = this.add.rectangle(0, 0, 0, 0, 0x000000),
    );

    ref[label].iconBody.setName('IconBody');
    ref[label].iconBody.setOrigin(0.0, 0.0);
    ref[label].iconBody.useAdaptationBefore(() => {
      const size = switchSize(20);
      const offset = switchSize(4);

      ref[label].iconBody.setSize(size, size);
      ref[label].iconBody.setPosition(offset, offset);
    });

    /**
     * Icon
     */

    ref[label].wrapper.add(
      ref[label].icon = this.add.image(0, 0, ScreenTexture.ICON, icon),
    );

    ref[label].icon.useAdaptationBefore(() => {
      ref[label].icon.setScale(switchSize(1.2));
      ref[label].icon.setPosition(
        ref[label].iconBody.x + ref[label].iconBody.width / 2,
        ref[label].iconBody.y + ref[label].iconBody.height / 2,
      );
    });

    /**
     * Label
     */

    ref[label].wrapper.add(
      ref[label].label = this.add.text(0, 0, label, {
        // resolution: window.devicePixelRatio,
        fontFamily: INTERFACE_FONT.MONOSPACE,
        color: color || '#fff',
      }),
    );

    ref[label].label.setAlpha(0.75);
    ref[label].label.useAdaptationBefore(() => {
      scaleText(ref[label].label, 9);
      ref[label].label.setPosition(
        ref[label].iconBody.x + ref[label].iconBody.width + switchSize(5),
        ref[label].iconBody.y - 2,
      );
    });

    /**
     * Value
     */

    ref[label].wrapper.add(
      ref[label].value = this.add.text(0, 0, String(value), {
        resolution: window.devicePixelRatio,
        fontFamily: INTERFACE_FONT.PIXEL,
        color: color || '#fff',
      }),
    );

    ref[label].value.useAdaptationBefore(() => {
      scaleText(ref[label].value, 10);
      ref[label].value.setPosition(
        ref[label].iconBody.x + ref[label].iconBody.width + switchSize(5),
        ref[label].label.y + ref[label].label.height + 1,
      );
    });
  }

  /**
   * Updating
   */

  return {
    update: () => {
      const currentParams = params();

      if (!currentParams) {
        return;
      }

      for (const { label, value } of currentParams) {
        if (state.values[label] !== value) {
          ref[label].value.setText(String(value));

          state.values[label] = value;
        }
      }
    },
  };
});

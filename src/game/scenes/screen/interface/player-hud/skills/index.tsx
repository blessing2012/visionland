import { useGame, useMatchMedia, useOutsideClick } from 'phaser-react-ui';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { INTERFACE_MOBILE_BREAKPOINT } from '~const/interface';
import { PLAYER_SKILLS } from '~const/world/entities/player';
import { Button } from '~scene/system/interface/button';
import { Hint } from '~scene/system/interface/hint';
import { IGame } from '~type/game';
import { TutorialStep } from '~type/tutorial';
import { PlayerSkill } from '~type/world/entities/player';

import { UpgradesListItem } from './item';
import { Wrapper, Container } from './styles';

export const Skills: React.FC = () => {
  const game = useGame<IGame>();

  const isSmallScreen = useMatchMedia(INTERFACE_MOBILE_BREAKPOINT);

  const upgradeTypes = useMemo(
    () => Object.keys(PLAYER_SKILLS) as PlayerSkill[],
    [],
  );

  const [isOpened, setOpened] = useState(false);
  const [hint, setHint] = useState(false);

  const refContainer = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setOpened(!isOpened);
  };

  const onClose = () => {
    setOpened(false);
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
      event.stopPropagation();
    }
  };

  useOutsideClick(refContainer, () => {
    onClose();
  }, []);

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    document.addEventListener('keyup', onKeyPress);

    return () => {
      document.removeEventListener('keyup', onKeyPress);
    };
  }, [isOpened]);

  useEffect(
    () => game.tutorial.bind(TutorialStep.UPGRADE_SKILL, {
      beg: () => setHint(true),
      end: () => setHint(false),
    }),
    [],
  );

  return (
    <Wrapper ref={refContainer}>
      <Button onClick={onClick} view={isOpened ? 'active' : undefined}>
        SKILLS
      </Button>
      {isOpened ? (
        <Container>
          <div>
            {upgradeTypes.map((type) => (
              <UpgradesListItem key={type} type={type} />
            ))}
          </div>
          {isSmallScreen && (
            <Button onClick={onClick}>Close</Button>
          )}
        </Container>
      ) : (
        hint && (
          <Hint side="top" align="left">
            Click to upgrade skills
          </Hint>
        )
      )}
    </Wrapper>
  );
};
import { ChangeEvent, KeyboardEvent, useState } from 'react';

import {
  MAX_TITLE_HEIGHT_PX,
  MAX_TITLE_LENGTH,
  TITLE_PADDING_Y,
  TITLE_TEXT_AREA_INITIAL_HEIGHT,
} from '@features/ExpendedNote/lib/const';
import selectActiveNote from '@pages/Notes/lib/selectors/selectActiveNote';
import { BACKSPACE_KEY, mockedNotes } from '@shared/lib/const';
import elementHasScrollbar from '@shared/lib/helpers/elementHasScroll';
import useAppSelector from '@shared/lib/hooks/useAppSelector';

const Title = () => {
  const selectedNote = useAppSelector(selectActiveNote);
  const { title: initialTitle } = mockedNotes[selectedNote];

  const [title, setTitle] = useState(initialTitle);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e;
    const isMaxHeightExceeded = target.clientHeight > MAX_TITLE_HEIGHT_PX;

    if (isMaxHeightExceeded) return;

    setTitle(target.value);

    if (!elementHasScrollbar(target)) return;

    const newHeighPlusOneRow = `${Number.parseInt(getComputedStyle(target).height, 10) + (TITLE_TEXT_AREA_INITIAL_HEIGHT - TITLE_PADDING_Y)}px`;
    target.style.height = newHeighPlusOneRow;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== BACKSPACE_KEY) return;

    const target = e.target as HTMLTextAreaElement;

    const targetHeight = Number.parseInt(getComputedStyle(target).height, 10);
    const newHeight =
      targetHeight - (TITLE_TEXT_AREA_INITIAL_HEIGHT - TITLE_PADDING_Y);
    target.style.height = `${newHeight}px`;

    const isBiggerInitialHeight = newHeight > TITLE_TEXT_AREA_INITIAL_HEIGHT;
    if (!isBiggerInitialHeight)
      target.style.height = `${TITLE_TEXT_AREA_INITIAL_HEIGHT}px`;
  };

  return (
    <textarea
      placeholder="Title your todo..."
      value={title}
      maxLength={MAX_TITLE_LENGTH}
      style={{ height: TITLE_TEXT_AREA_INITIAL_HEIGHT }}
      className="resize-none overflow-hidden rounded-sm bg-transparent px-3 py-1 text-xl font-medium outline-none transition-shadow focus:ring-4 focus:ring-high-contrast-inverse-primary focus:ring-offset-4 focus:ring-offset-surface"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Title;
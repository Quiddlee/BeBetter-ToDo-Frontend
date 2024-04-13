import { mockLabels } from '@shared/lib/const';
import useAppSelector from '@shared/lib/hooks/useAppSelector';
import selectNotes from '@shared/lib/selectors/selectNotes';
import NotesList from '@shared/ui/NotesList';
import { useParams } from 'react-router-dom';

const Label = () => {
  const notes = useAppSelector(selectNotes);
  const { labelId } = useParams();
  const activeLabel = mockLabels.at(Number(labelId));

  if (!activeLabel) throw new Error('No active label provided!');

  const labelNotes = notes.filter(({ labels }) =>
    labels.some((label) => label.title === activeLabel.title),
  );
  return <NotesList notes={labelNotes} />;
};

export default Label;

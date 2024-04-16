import { FC, PropsWithChildren } from 'react';

import { controlsStyles } from '@pages/Notes/lib/const';

const Controls: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="ml-auto flex gap-3" style={controlsStyles}>
      {children}
    </div>
  );
};

export default Controls;

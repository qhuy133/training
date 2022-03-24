import { useCallback, useContext, useRef } from 'react';

import { Context } from '../providers/Modals';

const useModal = (modal?: React.ReactNode, id?: string, backdropClick = true) => {
  const { onDismiss, onPresent } = useContext(Context);
  const ref = useRef<string>(id || '');

  const handlePresent = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    modal;
    ref.current = onPresent(modal, backdropClick);
  }, [backdropClick, modal, onPresent]);

  const handleDismiss = useCallback(() => {
    onDismiss(ref.current);
  }, [onDismiss]);

  return [handlePresent, handleDismiss];
};

export default useModal;
